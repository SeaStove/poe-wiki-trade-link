const itemsStore = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(sender);
  if (message.action === "openTradePage") {
    var url = "https://www.pathofexile.com/trade/";

    chrome.tabs.create({ url }, function (tab) {
      const openedTabId = tab.id;
      console.log("created tab id", tab.id);
      itemsStore[openedTabId] = {
        itemName: message.itemName,
        itemType: message.itemType,
      };
    });
  } else if (message.action === "getItemInfo") {
    console.log("calling getItemInfo");
    if (itemsStore[sender.tab.id]) {
      sendResponse(itemsStore[sender.tab.id]);
    }
  }
});

// chrome.tabs.onRemoved.addListener(function (tabId) {
//   if (tabId === openedTabId) {
//     // The opened tab was closed; reset the openedTabId variable
//     openedTabId = null;
//   }
// });
