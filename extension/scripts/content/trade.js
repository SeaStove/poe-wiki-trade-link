chrome.runtime.sendMessage({ action: "getItemInfo" }).then((response) => {
    console.log(response);
    if (!response?.data?.type) {
        return;
    }

    const { league = "Ancestor", status = "online" } = JSON.parse(
        localStorage.getItem("lscache-tradestate")
    );
    const apiUrl = `https://www.pathofexile.com/api/trade/search/${league}`;
    const webUrl = `https://www.pathofexile.com/trade/search/${league}`;
    const bodyData = {
        query: {
            status: { option: status },
            ...response.data,
            stats: [{ type: "and", filters: [] }],
        },
        sort: { price: "asc" },
    };
    console.log(bodyData);
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
            console.log(myNewUrl);
            document.location = myNewUrl;
        })
        .catch((error) => {
            console.error(error);
        });
});
