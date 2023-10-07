# poe-wiki-trade-link
Adds a link to the trade site for items on the PoE Wiki page

Getting a link to the PoE Trade site for a specific item is surprisingly complicated. In order to get this to work, the item name and type is grabbed from the wiki page, then a new tab is opened with the PoE Trade site. That new tab executes a query to the trade site's api to get the hash to go in the URL. Then the page is reloaded with that hash. 
