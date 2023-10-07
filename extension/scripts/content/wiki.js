const parentSpan = document.querySelector(
    "span.item-box.-unique > span.header.-double"
);
// Initialize variables to store the "name" and "type"
let itemName;
let itemType;

// Loop through the child nodes of the parent span element
for (let i = 0; i < parentSpan.childNodes.length; i++) {
    const childNode = parentSpan?.childNodes?.[i];

    // Check if the child node is a text node (nodeType 3) and not empty
    if (
        childNode &&
        childNode.nodeType === 3 &&
        childNode.textContent.trim() !== ""
    ) {
        // Check if the variable "name" is empty, if so, assign the text content to it
        if (itemName) {
            // If "name" is not empty, assign the text content to the variable "type"
            itemType = childNode.textContent.trim();
        } else {
            itemName = childNode.textContent.trim();
        }
    }
}
// Find the element with the class ".mw-page-title-main"
const pageTitleMain = document.querySelector(".mw-page-title-main");
if (pageTitleMain && itemName && itemType) {
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
            itemName,
            itemType,
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
