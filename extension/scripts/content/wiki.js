const messageData = {};

function buildLink(gemQuality) {
    console.log(messageData);
    const { name: itemName, type: itemType } = messageData;
    const query = {};
    if (gemQuality) {
        query.type = {
            option: itemType,
            discriminator: gemQuality.toLowerCase(),
        };
    } else {
        if (itemName) {
            query.name = itemName;
        }
        query.type = itemType;
    }
    return `https://www.pathofexile.com/trade/search/Ancestor?q={%22query%22:${encodeURIComponent(
        JSON.stringify(query)
    )}}`;
}

function generateLink() {
    const parentSpan = document.querySelector(
        ".mw-parser-output .infobox-page-container span.item-box > span.header"
    );
    if (!parentSpan?.childNodes) {
        return false;
    }

    // Initialize variables to store the "name" and "type"
    const textContent = [];

    // Loop through the child nodes of the parent span element
    for (let i = 0; i < parentSpan.childNodes.length; i++) {
        const childNode = parentSpan?.childNodes?.[i];
        // Check if the child node is a text node (nodeType 3) and not empty
        if (
            childNode &&
            childNode.nodeType === 3 &&
            childNode.textContent.trim() !== ""
        ) {
            textContent.push(childNode.textContent.trim());
        }
    }

    if (textContent.length == 1) {
        messageData.type = textContent[0];
    } else if (textContent.length == 2) {
        messageData.name = textContent[0];
        messageData.type = textContent[1];
    }

    // Find the element with the class ".mw-page-title-main"
    const pageTitleMain = document.querySelector(".mw-page-title-main");
    if (pageTitleMain && messageData.type) {
        const aTag = document.createElement("a");
        aTag.href = buildLink();
        aTag.target = "_blank"; // Open in a new tab
        aTag.rel = "noreferrer"; // No referrer
        aTag.style.fontSize = "1rem";
        aTag.style.marginLeft = "1rem";
        aTag.style.backgroundColor = "#513723";
        aTag.style.border = "none";
        aTag.style.borderRadius = "0.25rem";
        aTag.style.color = "var(--link-color)";
        aTag.style.cursor = "pointer";
        aTag.style.padding = "0.1rem 0.5rem";
        aTag.style.fontFamily = "var(--stylized-smallcaps-font)";
        aTag.textContent = "Trade";
        aTag.id = "poe-wiki-trade-link";

        // Chrome Version
        if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime) {
            browser = chrome;
        }

        const svgUrl = browser.runtime.getURL("images/open-new-window.svg");
        const iconImage = document.createElement("img");
        iconImage.src = svgUrl;
        iconImage.style.width = "1rem";
        iconImage.alt = "Icon";

        aTag.appendChild(iconImage);

        pageTitleMain.parentNode.insertBefore(aTag, pageTitleMain.nextSibling);
    }
}
generateLink();

function updateLinkWithGemQuality() {
    console.log("updating!");
    let selectedGemQuality = document.querySelector(
        ".gemqual-widget__option.is-selected"
    )?.textContent;
    console.log(selectedGemQuality);
    if (selectedGemQuality) {
        if (selectedGemQuality === "Superior") {
            selectedGemQuality = null;
        }
        const newHref = buildLink(selectedGemQuality);
        document.querySelector("#poe-wiki-trade-link").href = newHref;
    }
}

setTimeout(() => {
    const gemOptionElements = document.querySelectorAll(
        ".gemqual-widget__option"
    );
    gemOptionElements.forEach((element) => {
        element.addEventListener("click", updateLinkWithGemQuality);
    });
}, 300);
