/* global CMS, React */
(function () {
  if (typeof CMS === "undefined" || typeof React === "undefined") return;

  var STORAGE_KEY = "decap-preview-draft";
  var SITE = window.location.origin;
  var PREVIEW_TOKEN = "151751fa39cc93a351f798602e87ecaa9cc7e7c73e64b41c";
  var e = React.createElement;

  var COLLECTION_PATH = {
    shared: "/",
    home: "/",
    profile: "/work/",
    skills: "/work/",
    achievements: "/work/",
    "site-meta": "/work/",
    "work-page": "/work/",
    developer: "/developer/",
    studio: "/studio/",
    craft: "/craft/",
    roles: "/work/",
    education: "/work/",
  };

  function iframeSrc(collection) {
    var path = COLLECTION_PATH[collection] || "/work/";
    return SITE + path + "#preview=" + PREVIEW_TOKEN;
  }

  function toPlain(value, depth) {
    depth = depth || 0;
    if (value == null || depth > 8) return value;
    if (typeof value !== "object") return value;
    if (typeof value.toJS === "function") {
      try { return toPlain(value.toJS(), depth + 1); } catch (err) {}
    }
    if (typeof value.toObject === "function") {
      try { return toPlain(value.toObject(), depth + 1); } catch (err) {}
    }
    if (typeof value.toJSON === "function") {
      try { return toPlain(value.toJSON(), depth + 1); } catch (err) {}
    }
    if (value._map && typeof value._map === "object") {
      try {
        var mapObj = {};
        var keys = Object.keys(value._map);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (k === "size" || k.charAt(0) === "_") continue;
          mapObj[k] = toPlain(value._map[k], depth + 1);
        }
        if (Object.keys(mapObj).length) return mapObj;
      } catch (err) {}
    }
    if (Array.isArray(value)) {
      return value.map(function (item) { return toPlain(item, depth + 1); });
    }
    var out = {};
    var names = [];
    try { names = Object.keys(value); } catch (err) { names = []; }
    if (!names.length && typeof value.forEach === "function") {
      try {
        value.forEach(function (v, k) { out[String(k)] = toPlain(v, depth + 1); });
        if (Object.keys(out).length) return out;
      } catch (err) {}
    }
    for (var j = 0; j < names.length; j++) {
      var key = names[j];
      if (key.charAt(0) === "_") continue;
      out[key] = toPlain(value[key], depth + 1);
    }
    return out;
  }

  function normalizeEntry(entryIn) {
    var plain = toPlain(entryIn);
    if (!plain || typeof plain !== "object" || Array.isArray(plain)) return {};
    if (plain.data && typeof plain.data === "object" && !plain.company && !plain.credential && !plain.name && !plain.title) {
      plain = Object.assign({}, plain.data, plain);
    }
    if (plain.fields && typeof plain.fields === "object" && !plain.company && !plain.credential && !plain.name && !plain.title) {
      plain = Object.assign({}, plain.fields, plain);
    }
    return plain;
  }

  function sendToSiteFrames(payload) {
    var frames = document.querySelectorAll("iframe");
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var src = frame.getAttribute("src") || "";
      if (src.indexOf("/#preview=") === -1 && src.indexOf("/work/#preview=") === -1 &&
          src.indexOf("/developer/#preview=") === -1 && src.indexOf("/studio/#preview=") === -1 &&
          src.indexOf("/craft/#preview=") === -1) continue;
      try {
        if (frame.contentWindow) frame.contentWindow.postMessage(payload, SITE);
      } catch (err) {}
    }
  }

  function publishDraft(collection, rawEntry) {
    var entry = normalizeEntry(rawEntry);
    var safeEntry;
    try { safeEntry = JSON.parse(JSON.stringify(entry)); } catch (err) { safeEntry = {}; }
    var payload = {
      source: "decap-preview",
      type: "draft",
      collection: collection,
      entry: safeEntry,
      ts: Date.now(),
    };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (err) {}
    sendToSiteFrames(payload);
  }

  function fillPreviewShell() {
    var styleId = "site-preview-fill-css";
    if (!document.getElementById(styleId)) {
      var s = document.createElement("style");
      s.id = styleId;
      s.textContent =
        "#preview-pane,#preview-pane iframe{width:100%;height:100%;border:0;display:block}" +
        "iframe[src*='#preview=']{width:100%!important;height:100%!important;min-height:100%!important;border:0;display:block}";
      document.head.appendChild(s);
    }
    var frames = document.querySelectorAll("iframe");
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var src = frame.getAttribute("src") || "";
      if (src.indexOf("#preview=") === -1 && frame.id !== "preview-pane") continue;
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
        if (root) { root.style.height = "100%"; root.style.width = "100%"; }
        var inner = doc.querySelector(".site-preview-root iframe");
        if (inner) { inner.style.height = "100%"; inner.style.width = "100%"; }
      } catch (err) {}
    }
  }

  if (!window.__sitePreviewFillTimer) {
    window.__sitePreviewFillTimer = window.setInterval(fillPreviewShell, 500);
    fillPreviewShell();
  }

  function PreviewFrame(props) {
    publishDraft(props.collection, props.entry);
    // Same src string → React keeps the iframe mounted (no reload).
    // Different page path → one navigation when collection target changes.
    var src = iframeSrc(props.collection);
    window.setTimeout(fillPreviewShell, 0);
    return e(
      "div",
      {
        className: "site-preview-root",
        style: {
          width: "100%", height: "100%", minHeight: "100vh",
          border: "0", background: "#12100e", overflow: "hidden",
        },
      },
      e("iframe", {
        className: "site-preview-iframe",
        title: "Site preview",
        src: src,
        style: { width: "100%", height: "100%", minHeight: "100vh", border: "0", display: "block" },
      })
    );
  }

  function register(name, collection) {
    CMS.registerPreviewTemplate(name, function (props) {
      return e(PreviewFrame, {
        collection: collection,
        entry: normalizeEntry(props.entry),
      });
    });
  }

  register("shared", "shared");
  register("home", "home");
  register("profile", "profile");
  register("skills", "skills");
  register("achievements", "achievements");
  register("site-meta", "site-meta");
  register("work-page", "work-page");
  register("developer", "developer");
  register("studio", "studio");
  register("craft", "craft");
  register("roles", "roles");
  register("education", "education");
})();
