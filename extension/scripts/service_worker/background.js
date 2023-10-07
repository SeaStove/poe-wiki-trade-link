const itemsStore = {};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "openTradePage") {
        const url = "https://www.pathofexile.com/trade/";

        chrome.tabs.create({ url, active: false }, (tab) => {
            const openedTabId = tab.id;

            itemsStore[openedTabId] = {
                itemName: message.itemName,
                itemType: message.itemType,
            };
        });
    } else if (message.action === "getItemInfo" && itemsStore[sender.tab.id]) {
        sendResponse(itemsStore[sender.tab.id]);
        delete itemsStore[sender.tab.id];
        setTimeout(
            () => chrome.tabs.update(sender.tab.id, { selected: true }),
            500
        );
    }
});
