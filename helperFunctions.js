/**
 * @param {HTMLElement} overlay
 * @param {Element} el
 * @returns {{ x: number, y: number, width: number, height: number, devicePixelRatio: number }}
 */
function updateOverlay(overlay, el) {
  const isFullPage = el === document.documentElement;
  
  const rect = isFullPage
    ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
    : el.getBoundingClientRect();

  const selectedRect = {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    devicePixelRatio: window.devicePixelRatio
  };
  Object.assign(overlay.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  });
  return selectedRect;
}

/**
 * @param {string} dataUrl
 * @param {{ x: number, y: number, width: number, height: number, devicePixelRatio: number }} rect
 * @param {() => void} onDone
 */
function downloadCrop(dataUrl, rect, onDone) {
  const img = new Image();
  img.onload = () => {
    const dpr = rect.devicePixelRatio || 1;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      img,
      Math.round(rect.x * dpr),
      Math.round(rect.y * dpr),
      Math.round(rect.width * dpr),
      Math.round(rect.height * dpr),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "divshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    onDone();
  };
  img.src = dataUrl;
}
