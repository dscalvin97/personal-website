/* global CMS, React */
(function () {
  if (typeof CMS === "undefined" || typeof React === "undefined") return;

  var STORAGE_KEY = "decap-preview-draft";
  var SITE = window.location.origin;
  // Must match NEXT_PUBLIC_PREVIEW_TOKEN used by the site build
  var PREVIEW_TOKEN = "151751fa39cc93a351f798602e87ecaa9cc7e7c73e64b41c";
  var e = React.createElement;

  function iframeSrc() {
    // cache-bust so the work page re-reads draft state on entry changes if needed
    return SITE + "/work/?preview=" + Date.now() + "#preview=" + PREVIEW_TOKEN;
  }

  function sendToSiteFrames(payload) {
    var frames = document.querySelectorAll("iframe");
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var src = frame.getAttribute("src") || "";
      if (src.indexOf("/work/") === -1) continue;
      try {
        if (frame.contentWindow) {
          frame.contentWindow.postMessage(payload, SITE);
        }
      } catch (err) {
        /* ignore */
      }
    }
  }

  function publishDraft(collection, entry) {
    var payload = {
      source: "decap-preview",
      type: "draft",
      collection: collection,
      entry: entry,
      ts: Date.now(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("preview draft write failed", err);
    }
    sendToSiteFrames(payload);
  }

  function fillPreviewShell() {
    var styleId = "site-preview-fill-css";
    if (!document.getElementById(styleId)) {
      var s = document.createElement("style");
      s.id = styleId;
      s.textContent =
        "#preview-pane,#preview-pane iframe{width:100%;height:100%;border:0;display:block}" +
        "iframe[src*='/work/']{width:100%!important;height:100%!important;min-height:100%!important;border:0;display:block}";
      document.head.appendChild(s);
    }
    var frames = document.querySelectorAll("iframe");
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var src = frame.getAttribute("src") || "";
      if (src.indexOf("/work/") === -1 && frame.id !== "preview-pane") continue;
      try {
        var doc = frame.contentDocument;
        if (!doc || !doc.documentElement) continue;
        if (!doc.getElementById("site-preview-fill")) {
          var st = doc.createElement("style");
          st.id = "site-preview-fill";
          st.textContent =
            "html,body{height:100%;margin:0;background:#12100e}" +
            "body>div,body>#root{height:100%}" +
            ".site-preview-root,.site-preview-root iframe{width:100%;height:100%;border:0;display:block}";
          (doc.head || doc.documentElement).appendChild(st);
        }
        var root = doc.querySelector(".site-preview-root");
        if (root) {
          root.style.height = "100%";
          root.style.width = "100%";
        }
        var inner = doc.querySelector(".site-preview-root iframe");
        if (inner) {
          inner.style.height = "100%";
          inner.style.width = "100%";
        }
      } catch (err) {
        /* ignore */
      }
    }
  }

  if (!window.__sitePreviewFillTimer) {
    window.__sitePreviewFillTimer = window.setInterval(fillPreviewShell, 400);
    fillPreviewShell();
  }

  // No hooks: Decap renders with its bundled React.
  // Publish on every render (Decap re-renders preview as you type).
  function PreviewFrame(props) {
    var entry = props.entry;
    publishDraft(props.collection, entry);
    window.setTimeout(fillPreviewShell, 0);
    return e(
      "div",
      {
        className: "site-preview-root",
        style: {
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          border: "0",
          background: "#12100e",
          overflow: "hidden",
        },
      },
      e("iframe", {
        className: "site-preview-iframe",
        title: "Site preview",
        src: iframeSrc(),
        style: {
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          border: "0",
          display: "block",
        },
      })
    );
  }

  function normalizeEntry(entryIn) {
    if (!entryIn) return {};
    if (typeof entryIn.toJS === "function") return entryIn.toJS();
    return entryIn;
  }

  CMS.registerPreviewTemplate("roles", function (props) {
    return e(PreviewFrame, {
      collection: "roles",
      entry: normalizeEntry(props.entry),
    });
  });

  CMS.registerPreviewTemplate("education", function (props) {
    return e(PreviewFrame, {
      collection: "education",
      entry: normalizeEntry(props.entry),
    });
  });

  CMS.registerPreviewTemplate("content", function (props) {
    return e(PreviewFrame, {
      collection: "content",
      entry: normalizeEntry(props.entry),
    });
  });
})();
