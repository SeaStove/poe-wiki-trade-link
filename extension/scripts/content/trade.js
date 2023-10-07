chrome.runtime.sendMessage({ action: "getItemInfo" }).then((response) => {
    if (!(response?.itemName && response.itemType)) {
        return;
    }
    const { league = "Ancestor" } = JSON.parse(
        localStorage.getItem("lscache-tradestate")
    );
    const apiUrl = `https://www.pathofexile.com/api/trade/search/${league}`;
    const webUrl = `https://www.pathofexile.com/trade/search/${league}`;
    const { itemName, itemType } = response;
    const bodyData = {
        query: {
            status: { option: "any" },
            name: itemName,
            type: itemType,
            stats: [{ type: "and", filters: [] }],
        },
        sort: { price: "asc" },
    };
    fetch(apiUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
    })
        .then((response) => response.json())
        .then((data) => {
            let myNewUrl = `${webUrl}/${data.id}`;
            document.location = myNewUrl;
        })
        .catch((error) => {
            console.error(error);
        });
});
