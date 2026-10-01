const http = require("http");
const https = require("https");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 8787);
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const SITE = (process.env.SITE_ORIGIN || "https://calvin.makes.fyi").replace(/\/$/, "");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are required");
  process.exit(1);
}

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";
const CALLBACK_PATH = "/admin/oauth/callback";

function request(url, { method = "GET", headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === "https:" ? https : http;
    const req = lib.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method,
        headers: {
          Accept: "application/json",
          "User-Agent": "calvin-decap-proxy",
          ...headers,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

function html(res, body, status = 200) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(body);
}

function json(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(obj));
}

function authorizePage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Authorize CMS</title>
  <style>
    body { font: 14px/1.5 system-ui, sans-serif; background: #12100e; color: #f3efe7; display: grid; place-items: center; min-height: 100vh; margin: 0; }
    main { text-align: center; padding: 2rem; max-width: 22rem; }
    .meta { color: #9a9084; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
  </style>
</head>
<body>
  <main>
    <p class="meta">GitHub authorization</p>
    <p id="status">Connecting…</p>
    <p id="error" style="color:#ff6b4a"></p>
  </main>
  <script>
    (function () {
      var params = new URLSearchParams(location.search);
      var provider = params.get("provider") || "github";
      var scope = params.get("scope") || "repo";
      var origin = location.origin;
      var statusEl = document.getElementById("status");
      var errorEl = document.getElementById("error");
      var opened = false;

      function fail(msg) {
        errorEl.textContent = msg;
        statusEl.textContent = "Authorization failed";
        try {
          if (window.opener) {
            window.opener.postMessage(
              "authorization:" + provider + ":error:" + JSON.stringify({ message: msg }),
              origin
            );
          }
        } catch (e) {}
      }

      window.addEventListener("message", function (event) {
        if (event.origin !== origin) return;
        if (event.data === "authorizing:" + provider && !opened) {
          opened = true;
          statusEl.textContent = "Redirecting to GitHub…";
          location.href =
            "/admin/oauth/start?provider=" +
            encodeURIComponent(provider) +
            "&scope=" +
            encodeURIComponent(scope);
        }
      });

      if (!window.opener) {
        fail("Open this page from the CMS login popup.");
        return;
      }

      window.opener.postMessage("authorizing:" + provider, origin);
      statusEl.textContent = "Waiting for CMS…";
      setTimeout(function () {
        if (!opened) fail("Did not receive handshake from CMS. Try again.");
      }, 8000);
    })();
  </script>
</body>
</html>`;
}

function successPage(token) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex" />
  <title>Authorized</title>
</head>
<body>
  <p>Authorized. You can close this window.</p>
  <script>
    (function () {
      var data = ${JSON.stringify({ token })};
      var provider = "github";
      var origin = ${JSON.stringify(SITE)};
      if (window.opener) {
        window.opener.postMessage(
          "authorization:" + provider + ":success:" + JSON.stringify(data),
          origin
        );
        window.close();
      } else {
        document.body.textContent = "Authorized, but no CMS window to notify.";
      }
    })();
  </script>
</body>
</html>`;
}

function errorPage(message) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex" />
  <title>Authorization failed</title>
</head>
<body>
  <p>Authorization failed: ${String(message).replace(/[<>&]/g, "")}</p>
  <script>
    (function () {
      var msg = ${JSON.stringify(String(message))};
      var origin = ${JSON.stringify(SITE)};
      if (window.opener) {
        window.opener.postMessage(
          "authorization:github:error:" + JSON.stringify({ message: msg }),
          origin
        );
      }
    })();
  </script>
</body>
</html>`;
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  }).toString();
  const tokenRes = await request(GITHUB_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
  let payload = {};
  try {
    payload = JSON.parse(tokenRes.data || "{}");
  } catch {
    payload = {};
  }
  if (!payload.access_token) {
    const err = payload.error_description || payload.error || "token_exchange_failed";
    throw new Error(err);
  }
  return payload.access_token;
}

async function handle(req, res) {
  const url = new URL(req.url, SITE);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": SITE,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // Decap Netlify-protocol popup entrypoint
  if (path === "/admin/oauth/authorize") {
    return html(res, authorizePage());
  }

  // Redirect popup to GitHub OAuth
  if (path === "/admin/oauth/start") {
    const provider = url.searchParams.get("provider") || "github";
    const scope = url.searchParams.get("scope") || "repo";
    if (provider !== "github") {
      return html(res, errorPage("Unsupported provider: " + provider), 400);
    }
    const gh = new URL(GITHUB_AUTHORIZE);
    gh.searchParams.set("client_id", CLIENT_ID);
    gh.searchParams.set("redirect_uri", SITE + CALLBACK_PATH);
    gh.searchParams.set("scope", scope);
    gh.searchParams.set(
      "state",
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    );
    res.writeHead(302, {
      Location: gh.toString(),
      "Cache-Control": "no-store",
    });
    return res.end();
  }

  // GitHub redirects here after user approves
  if (path === CALLBACK_PATH) {
    const code = url.searchParams.get("code");
    const ghError = url.searchParams.get("error");
    if (ghError || !code) {
      return html(
        res,
        errorPage(ghError || url.searchParams.get("error_description") || "missing_code"),
        400
      );
    }
    try {
      const token = await exchangeCode(code);
      return html(res, successPage(token));
    } catch (err) {
      return html(res, errorPage(String(err.message || err)), 400);
    }
  }

  if (path === "/healthz") {
    return json(res, 200, { ok: true });
  }

  return json(res, 404, { error: "not_found", path });
}

http
  .createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error(err);
      try {
        html(res, errorPage(String(err.message || err)), 500);
      } catch {
        res.writeHead(500);
        res.end("proxy error");
      }
    });
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`decap oauth proxy on 127.0.0.1:${PORT} (Netlify popup protocol)`);
  });
