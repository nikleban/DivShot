chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["helperFunctions.js", "content.js"],
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type !== "CAPTURE_ELEMENT") return;
  if (!sender || !sender.tab || !sender.tab.id) return;
  const { id: tabId, windowId } = sender.tab;

  chrome.tabs.captureVisibleTab(windowId, { format: "png" }, (dataUrl) => {
    chrome.tabs.sendMessage(tabId, {
      type: "SCREENSHOT_READY",
      dataUrl,
      rect: message.rect,
    });
  });
});
