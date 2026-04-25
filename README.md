📸 DivShot – Element Screenshot Chrome Extension

DivShot is a lightweight browser extension that lets you select any element on a webpage and instantly capture it as an image.

No manual cropping. No full-page screenshots. Just click → select → download.

✨ Features
Hover to highlight any element on the page
Click to select and capture it
Automatically crops to the exact element bounds
Downloads as a PNG
Works on any normal webpage
🚀 Demo Flow
Click the extension icon
Hover over elements (they get highlighted)
Click the element you want
Screenshot is automatically downloaded
🧠 How It Works

DivShot uses standard browser extension APIs:

Content Script
Injected into the page
Detects hovered elements
Draws selection overlay
Sends selected element dimensions
Background Script
Captures visible tab screenshot
Sends image back to content script
Canvas API
Crops screenshot to selected element
Generates final PNG
