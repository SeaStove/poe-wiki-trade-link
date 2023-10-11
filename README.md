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

Install via the Chrome web store: https://chrome.google.com/webstore/detail/poe-wiki-trade-link/nfgiigabbcilbognngigjadcmchfejfc/related?hl=en&authuser=0

## FAQ

-   Are there any downsides?

    -   I have found that making too many requests too quickly will get you timed out from the trade site, just like with other tools. I don't know the exact number. This tool is using roughly the same process [Awakened PoE Trade](https://github.com/SnosMe/awakened-poe-trade/blob/b446c617cc1d4970067c209cf172a5dd93fcf72a/renderer/src/web/price-check/trade/pathofexile-trade.ts#L83) uses.

-   Is there a Firefox version?

    -   Soon!

-   This doesn't work for me?
    -   My testing scope of this tool is very limited, and I'm always looking for ways to improve it. Please create an Issue in the [Issues tab](https://github.com/SeaStove/poe-wiki-trade-link/issues) to report bugs or feature requests. You can view the project's [Kanban board](https://github.com/users/SeaStove/projects/3/views/1) to see the status of issues.

## The Code

### Wiki.js

This JavaScript file is responsible for:

-   Extract the item's name and type from the PoE Wiki page.
-   Creating and styling a button to open the PoE trade search page using the item name and type as a query.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
