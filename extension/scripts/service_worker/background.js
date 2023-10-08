const itemsStore = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const { action, ...messageData } = message;
    if (action === "openTradePage") {
        const url = "https://www.pathofexile.com/trade/";
        console.log(message);
        chrome.tabs.create({ url, active: false }, (tab) => {
            const openedTabId = tab.id;
            itemsStore[openedTabId] = messageData;
            console.log(itemsStore);
        });
    } else if (action === "getItemInfo") {
        if (!itemsStore[sender.tab.id]) {
            console.error("No item info found for tab", sender.tab.id);
            return;
        }
        console.log("getItemInfo", itemsStore[sender.tab.id]);
        sendResponse({ data: itemsStore[sender.tab.id] });
        delete itemsStore[sender.tab.id];
        setTimeout(() => {
            chrome.tabs.update(sender.tab.id, { selected: true });
        }, 500);
    } else {
        console.error("Unknown action", action, message, sender);
    }
});
