console.log("executing script");
const searchBarQuery =
    "#trade > div.top > div > div:nth-child(1) > div.search-left > div > div.multiselect__tags > input";
const searchButtonQuery =
    "#trade > div.top > div > div.controls > div.controls-center > button";
const searchBarWrapperQuery =
    "#trade > div.top > div > div:nth-child(1) > div.search-left > div";
chrome.runtime.sendMessage({ action: "getItemInfo" }).then((response) => {
    console.log(response);
    if (response && response.itemName && response.itemType) {
        console.log("creating observer");
        const observer = new MutationObserver(function (
            mutations,
            mutationInstance
        ) {
            if (document.querySelector(searchBarQuery)) {
                try {
                    console.log("executing!");

                    const { itemName, itemType } = response;
                    console.log("search bar found!");

                    const searchBar = document.querySelector(searchBarQuery);
                    const textContent = itemName + " " + itemType;
                    setTimeout(() => {
                        // searchBar.click();
                        const searchBarWrapper = document.querySelector(
                            searchBarWrapperQuery
                        );
                        searchBarWrapper.classList.add("multiselect--active");
                        document;
                        const dropdown = document.querySelector(
                            "#trade > div.top > div > div:nth-child(1) > div.search-left > div > div.multiselect__content-wrapper"
                        );
                        dropdown.style.display = "inline-block";
                        simulateArrowDownKeyPress();
                    });

                    setTimeout(() => {
                        simulateArrowDownKeyPress();
                        simulateArrowDownKeyPress();

                        simulateArrowDownKeyPress();
                    }, 1000);

                    setTimeout(() => {
                        simulateEnterKeyPress(searchBar);
                    }, 1500);

                    setTimeout(() => {
                        document.querySelector(searchButtonQuery).click();
                    }, 2500);
                    // setTimeout(() => {
                    //     simulateTypingSlowly(
                    //         searchBar,
                    //         textContent,
                    //         100,
                    //         () => {
                    //             setTimeout(() => {
                    //                 // searchBar.click();
                    //                 const searchBarWrapper =
                    //                     document.querySelector(
                    //                         searchBarWrapperQuery
                    //                     );
                    //                 searchBarWrapper.classList.add(
                    //                     "multiselect--active"
                    //                 );
                    //                 document;
                    //                 const dropdown = document.querySelector(
                    //                     "#trade > div.top > div > div:nth-child(1) > div.search-left > div > div.multiselect__content-wrapper"
                    //                 );
                    //                 dropdown.style.display = "inline-block";
                    //             });
                    //             setTimeout(() => {
                    //                 simulateSpacebarKeyPress(searchBar);
                    //             }, 1000);
                    //             // setTimeout(() => {
                    //             //     simulateEnterKeyPress(searchBar);
                    //             // }, 2000);
                    //             // setTimeout(() => {
                    //             //     simulateArrowDownKeyPress(searchBar);
                    //             // }, 3000);
                    //             // setTimeout(() => {
                    //             //     simulateArrowDownKeyPress(searchBar);
                    //             // }, 4000);
                    //         }
                    //     );
                    // }, 1000);
                } catch (error) {
                    console.error(error);
                } finally {
                    mutationInstance.disconnect();
                }
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true,
        });
    }
});

function simulateTypingSlowly(element, text, delay, callback) {
    let index = 0;

    function typeNextCharacter() {
        if (index < text.length) {
            const char = text.charAt(index);
            console.log("Typing " + char);

            const keyCode = char.charCodeAt(0);

            const keyDownEvent = new KeyboardEvent("keydown", {
                key: char,
                code: char,
                keyCode: keyCode,
                which: keyCode,
                charCode: 0,
            });

            const keyPressEvent = new KeyboardEvent("keypress", {
                key: char,
                code: char,
                keyCode: keyCode,
                which: keyCode,
                charCode: 0,
            });

            const keyUpEvent = new KeyboardEvent("keyup", {
                key: char,
                code: char,
                keyCode: keyCode,
                which: keyCode,
                charCode: 0,
            });

            element.dispatchEvent(keyDownEvent);
            element.dispatchEvent(keyPressEvent);

            // Set the value of the input field to the current text
            element.value += char;

            element.dispatchEvent(keyUpEvent);

            index++;

            setTimeout(typeNextCharacter, delay);
        } else {
            if (typeof callback === "function") {
                callback();
            }
        }
    }

    typeNextCharacter();
}

function simulateArrowDownKeyPress(inputElement) {
    console.log("typing arrow down");
    inputElement = document.activeElement;
    var event = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        code: "ArrowDown",
        keyCode: 40,
        which: 40,
        charCode: 0,
        bubbles: true,
        cancelable: true,
    });

    // Dispatch the first Down arrow key event on the document or a specific element
    inputElement.dispatchEvent(event);
}

function simulateEnterKeyPress(inputElement) {
    console.log("typing enter");

    const event = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        which: 13,
        keyCode: 13,
        charCode: 13,
    });

    inputElement.dispatchEvent(event);
}

function simulateSpacebarKeyPress(inputElement) {
    // Create a new keyboard event for the "keydown" event with the Spacebar key
    console.log("typing space");
    inputElement = document.activeElement;

    var event = new KeyboardEvent("keydown", {
        key: " ",
        code: "Space",
        keyCode: 32,
        which: 32,
        charCode: 0,
        bubbles: true,
        cancelable: true,
    });

    // Dispatch the Spacebar key event on the inputElement or a specific element
    inputElement.dispatchEvent(event);
}

// const observer = new MutationObserver(function (mutations, mutationInstance) {
//   if (document.querySelector(searchBarQuery)) {
//     const { itemName, itemType } = response.data;
//     const searchBar = document.querySelector(searchBarQuery);
//     searchBar.textContent = itemName + " " + itemType;
//     const searchButton = document.querySelector(searchButtonQuery);
//     searchButton.click();
//     mutationInstance.disconnect();
//   }
// });

// observer.observe(document, {
//   childList: true,
//   subtree: true,
// });
