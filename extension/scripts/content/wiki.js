const parentSpan = document.querySelector("span.item-box > span.header");
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
} else {
    console.error("Could not parse item name and type");
}

// Find the element with the class ".mw-page-title-main"
const pageTitleMain = document.querySelector(".mw-page-title-main");
if (pageTitleMain && messageData.type) {
    // Create a new button element
    const button = document.createElement("button");
    button.href = "#";
    button.style.fontSize = "1rem";
    button.style.marginLeft = "1rem";
    button.style.backgroundColor = "#513723";
    button.style.border = "none";
    button.style.borderRadius = "0.25rem";
    button.style.color = "var(--link-color)";
    button.style.cursor = "pointer";
    button.style.padding = "0.1rem 0.5rem";
    button.style.fontFamily = "var(--stylized-smallcaps-font)";

    const svgUrl = chrome.runtime.getURL("images/open-new-window.svg");
    const iconImage = document.createElement("img");
    iconImage.src = svgUrl;
    iconImage.style.width = "1rem";
    iconImage.alt = "Icon";

    setButtonStyles(button, iconImage);

    button.addEventListener("click", function () {
        setLoadingStyles(button);
        chrome.runtime.sendMessage({
            action: "openTradePage",
            ...messageData,
        });
        setTimeout(function () {
            setButtonStyles(button, iconImage);
        }, 1000);
    });

    pageTitleMain.parentNode.insertBefore(button, pageTitleMain.nextSibling);
}

function setButtonStyles(button, iconImage) {
    button.textContent = "Trade ";
    button.style.color = "var(--link-color)";
    button.style.cursor = "pointer";
    button.appendChild(iconImage);
    button.disabled = false;
}

function setLoadingStyles(button) {
    button.textContent = "Loading...";
    button.disabled = true;
    button.style.cursor = "default";
    button.style.color = "var(--poe-color-default)";
}
