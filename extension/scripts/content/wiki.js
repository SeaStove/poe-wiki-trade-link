const parentSpan = document.querySelector(
    ".mw-parser-output .infobox-page-container span.item-box > span.header"
);
// Initialize variables to store the "name" and "type"
const messageData = {};
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
    aTag.href = `https://www.pathofexile.com/trade/search/Ancestor?q={%22query%22:{%22type%22:%22${encodeURIComponent(
        messageData.type
    )}%22${
        messageData.name
            ? `,%22name%22:%22${encodeURIComponent(messageData.name)}%22`
            : ``
    }}}`;
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

    const svgUrl = chrome.runtime.getURL("images/open-new-window.svg");
    const iconImage = document.createElement("img");
    iconImage.src = svgUrl;
    iconImage.style.width = "1rem";
    iconImage.alt = "Icon";

    aTag.appendChild(iconImage);

    pageTitleMain.parentNode.insertBefore(aTag, pageTitleMain.nextSibling);
}
