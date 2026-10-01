const http = require("http");
const https = require("https");
const { URL } = require("url");

const PORT = process.env.PORT || 8787;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const SITE = process.env.SITE_ORIGIN || "https://calvin.makes.fyi";
const ADMIN_CALLBACK = `${SITE}/admin/api/v1/authorize`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are required");
  process.exit(1);
}

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

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

function json(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": SITE,
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(obj));
}

async function handle(req, res) {
  const url = new URL(req.url, SITE);
  const path = url.pathname;

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": SITE,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  // Decap asks for the OAuth authorize endpoint
  if (path.endsWith("/api/v1/authorize")) {
    // If this is the OAuth callback (has ?code=)
    const code = url.searchParams.get("code");
    if (code) {
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
        return json(res, 400, {
          error: "github_oauth_failed",
          details: payload,
        });
      }
      // Redirect back to Decap admin with token fragment
      const state = url.searchParams.get("state") || "";
      const dest = `${SITE}/admin/#access_token=${encodeURIComponent(
        payload.access_token
      )}&provider=github${state ? `&state=${encodeURIComponent(state)}` : ""}`;
      res.writeHead(302, { Location: dest, "Cache-Control": "no-store" });
      return res.end();
    }

    // Kick off GitHub OAuth
    const state =
      url.searchParams.get("state") ||
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const gh = new URL(GITHUB_AUTHORIZE);
    gh.searchParams.set("client_id", CLIENT_ID);
    gh.searchParams.set("redirect_uri", ADMIN_CALLBACK);
    gh.searchParams.set("state", state);
    gh.searchParams.set("scope", "repo");
    res.writeHead(302, { Location: gh.toString(), "Cache-Control": "no-store" });
    return res.end();
  }

  // CORS for any other admin API path Decap may hit
  if (req.method === "GET" || req.method === "POST") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": SITE,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  json(res, 404, { error: "not_found" });
}

http
  .createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error(err);
      json(res, 500, { error: "proxy_error", message: String(err.message || err) });
    });
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`decap oauth proxy on 127.0.0.1:${PORT}`);
  });
