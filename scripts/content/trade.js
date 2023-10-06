const apiUrl = "https://www.pathofexile.com/api/trade/search/Ancestor";
const webUrl = "https://www.pathofexile.com/trade/search/Ancestor";

chrome.runtime.sendMessage({ action: "getItemInfo" }).then((response) => {
    if (response && response.itemName && response.itemType) {
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
                // Handle the response data here
                let myNewUrl = `${webUrl}/${data.id}`;
                document.location = myNewUrl;
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors here
                console.error(error);
            });
    }
});
