const parentSpan = document.querySelector(
  "#mw-content-text > div.mw-parser-output > span > span:nth-child(1) > span.header.-double"
);
// Initialize variables to store the "name" and "type"
var itemName;
var itemType;

// Loop through the child nodes of the parent span element
for (var i = 0; i < parentSpan.childNodes.length; i++) {
  var childNode = parentSpan.childNodes[i];

  // Check if the child node is a text node (nodeType 3) and not empty
  if (childNode.nodeType === 3 && childNode.textContent.trim() !== "") {
    // Check if the variable "name" is empty, if so, assign the text content to it
    if (!itemName) {
      itemName = childNode.textContent.trim();
    } else {
      // If "name" is not empty, assign the text content to the variable "type"
      itemType = childNode.textContent.trim();
      // break; // Exit the loop after finding the "type"
    }
  }
}
// Find the element with the class ".mw-page-title-main"
var pageTitleMain = document.querySelector(".mw-page-title-main");
if (pageTitleMain && itemName && itemType) {
  // Create a new button element
  var customButton = document.createElement("button");
  customButton.textContent = "<Trade Link>"; // Set button text

  // Add an event listener to the button
  customButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({
      action: "openTradePage",
      itemName,
      itemType,
    });
  });

  // Insert the button next to the ".mw-page-title-main" element
  pageTitleMain.parentNode.insertBefore(
    customButton,
    pageTitleMain.nextSibling
  );
}
