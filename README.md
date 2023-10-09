<base target="_blank">
# PoE Wiki Trade Link

**Description:** This Chrome extension adds a button to the [Path of Exile (PoE) Wiki](https://poewiki.net/) page to quickly open a [PoE trade](https://www.pathofexile.com/trade) search page for a specific item. It allows you to seamlessly transition from researching an item on the PoE Wiki to finding it on the PoE trade platform.

## Example

![](https://github.com/SeaStove/poe-wiki-trade-link/blob/main/images/example.gif)

## Usage

1. Install the extension in your Chrome browser.
2. Visit a PoE Wiki page that displays an item you want to find.
3. Click the "Trade" button added by the extension.
4. A new tab will open with the PoE trade search results for the item.

## Installation

1. Clone this repository or download the extension files.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.

## FAQ

-   Are there any downsides?

    -   I have found that making too many requests too quickly will get you timed out from the trade site, just like with other tools. I don't know the exact number. This tool is using roughly the same process [Awakened PoE Trade](https://github.com/SnosMe/awakened-poe-trade/blob/b446c617cc1d4970067c209cf172a5dd93fcf72a/renderer/src/web/price-check/trade/pathofexile-trade.ts#L83) uses.

-   Is there a Firefox version?
    -   Unfortunately at this time Firefox does not support Service Workers which are required to run the extension. If the architecture changes to remove the service worker or Firefox allows them then I will add a Firefox extension.
 
-   This doesn't work for me?
    -   My testing scope of this tool is very limited, and I'm always looking for ways to improve it. Please create an Issue in the [Issues tab](https://github.com/SeaStove/poe-wiki-trade-link/issues) to report bugs or feature requests. You can view the current Kanban board [here](https://github.com/users/SeaStove/projects/3/views/1)

## The Code

Getting a link to the PoE Trade site for a specific item is surprisingly complicated. To get this to work, the item name and type are grabbed from the wiki page, then a new tab is opened with the PoE Trade site. That new tab executes a query to the trade site's API to get the hash to go in the URL. Then the page is reloaded with that hash.

### Wiki.js

This JavaScript file is responsible for:

-   Extract the item's name and type from the PoE Wiki page.
-   Creating and styling a button to open the PoE trade search page.
-   Handling button clicks and sending a message to the background script to initiate the trade search.

### Background.js

This JavaScript file serves as the background script for the extension. It handles:

-   Listening for messages from the content script (Wiki.js).
-   Creating a new tab with the PoE trade search page when requested.
-   Storing item information temporarily to share between scripts.

### Trade.js

This JavaScript file runs on the PoE trade search page. It:

-   Retrieves item information from the background script (Background.js).
-   Constructs a search query for the PoE trade API based on the item name and type.
-   Sends a POST request to the API to find relevant listings.
-   Redirects the user to the PoE trade search results page.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
