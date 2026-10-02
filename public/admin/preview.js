/* global CMS, React */
(function () {
  if (typeof CMS === "undefined") return;

  var STORAGE_KEY = "decap-preview-draft";
  var SITE = window.location.origin;
  // Must match NEXT_PUBLIC_PREVIEW_TOKEN used by the site build
  var PREVIEW_TOKEN = "151751fa39cc93a351f798602e87ecaa9cc7e7c73e64b41c";
  var e = React.createElement;

  function iframeSrc() {
    return SITE + "/work/#preview=" + PREVIEW_TOKEN;
  }

  function writeDraft(collection, entry) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          collection: collection,
          entry: entry,
          ts: Date.now(),
        })
      );
    } catch (err) {
      console.warn("preview draft write failed", err);
    }
  }

  function notifyIframe(ref) {
    try {
      if (ref && ref.current && ref.current.contentWindow) {
        ref.current.contentWindow.postMessage(
          { source: "decap-preview", type: "sync" },
          SITE
        );
      }
    } catch (err) {
      /* ignore */
    }
  }

  function PreviewFrame(props) {
    var collection = props.collection;
    var entry = props.entry;
    var ref = React.useRef(null);

    React.useEffect(
      function () {
        writeDraft(collection, entry);
        notifyIframe(ref);
      },
      [collection, entry]
    );

    return e(
      "div",
      {
        style: {
          height: "100%",
          width: "100%",
          border: "0",
          background: "#12100e",
        },
      },
      e("iframe", {
        ref: ref,
        title: "Site preview",
        src: iframeSrc(),
        style: { height: "100%", width: "100%", border: "0" },
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
