const itemsStore = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { action, ...messageData } = message;
    if (action === "openTradePage") {
        const url = "https://www.pathofexile.com/trade/";
        chrome.tabs.create({ url, active: false }, (tab) => {
            const openedTabId = tab.id;
            itemsStore[openedTabId] = messageData;
        });
    } else if (action === "getItemInfo") {
        if (!itemsStore[sender.tab.id]) {
            return;
        }
        sendResponse({ data: itemsStore[sender.tab.id] });
        delete itemsStore[sender.tab.id];
        setTimeout(() => {
            chrome.tabs.update(sender.tab.id, { selected: true });
        }, 500);
    } else {
        console.error("Unknown action", action, message, sender);
    }
});
