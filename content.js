(() => {
  if (window.__divshotActive) {
    window.__divshotCleanup?.();
    return;
  }
  window.__divshotActive = true;

  /** @type {{ x: number, y: number, width: number, height: number, devicePixelRatio: number } | null} */
  let selectedRect = null;

  const overlay = document.createElement("div");

  Object.assign(overlay.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "2147483647",
    border: "2px solid #6366f1",
    background: "rgba(99, 102, 241, 0.12)",
    boxSizing: "border-box",
  });

  document.body.appendChild(overlay);

  function onMouseMove(/** @type {MouseEvent} */ e) {
    let el = document.elementFromPoint(e.clientX, e.clientY);
    if (el === overlay || el === document.body) return;

    if (!el) el = document.documentElement;

    selectedRect = updateOverlay(overlay, el);
  }

  function onClick(/** @type {MouseEvent} */ e) {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedRect) return;
    overlay.style.display = "none";
    try {
      chrome.runtime.sendMessage({
        type: "CAPTURE_ELEMENT",
        rect: selectedRect,
      });
    } catch {
      cleanup();
    }
  }

  function onKeyDown(/** @type {KeyboardEvent} */ e) {
    e.preventDefault();
    if (e.key === "Escape") {
      window.__divshotCleanup?.();
      return;
    } else if (e.key === "Enter") {
      try {
        chrome.runtime.sendMessage({
          type: "CAPTURE_ELEMENT",
          rect: selectedRect,
        });
      } catch {
        cleanup();
      }
    }
  }

  function cleanup() {
    window.__divshotActive = false;
    window.__divshotCleanup = undefined;
    overlay.remove();
    document.removeEventListener("mousemove", onMouseMove, true);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("keydown", onKeyDown, true);
  }

  window.__divshotCleanup = cleanup;

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SCREENSHOT_READY") {
      downloadCrop(message.dataUrl, message.rect, cleanup);
    }
  });

  document.addEventListener("mousemove", onMouseMove, true);
  document.addEventListener("click", onClick, true);
  document.addEventListener("keydown", onKeyDown, true);
})();
