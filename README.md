# DivShot

> Select any element on any page. Screenshot it. Done.

DivShot is a minimal Chrome extension that lets you hover over any element on a webpage, highlight it, and capture it as a PNG — no cropping, no fuss.

---

## How it works

1. Click the **DivShot** icon in your toolbar
2. Hover over any element — it gets highlighted
3. **Click** to capture it, or press **Enter**
4. The screenshot downloads automatically as `divshot.png`
5. Press **Escape** to cancel at any time

---

## Features

- Pixel-perfect crop using `getBoundingClientRect` + device pixel ratio
- Highlights any DOM element on hover
- Keyboard support — `Enter` to capture, `Escape` to cancel
- Toggle off by clicking the icon again
- Works on any normal webpage

---

## Installation

1. Clone or download this repo
2. Open `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the `DivShot` folder

---

## Project structure

```
DivShot/
├── manifest.json        # Extension config (Manifest V3)
├── background.js        # Service worker — captures tab screenshot
├── content.js           # Injected into page — overlay & interaction
├── helperFunctions.js   # Shared helpers (updateOverlay, downloadCrop)
└── globals.d.ts         # TypeScript declarations for window globals
```

---

## Tech

- Chrome Extensions Manifest V3
- `chrome.scripting.executeScript` for content script injection
- `chrome.tabs.captureVisibleTab` for screenshot
- Canvas API for cropping to element bounds
- Plain JavaScript with JSDoc types
