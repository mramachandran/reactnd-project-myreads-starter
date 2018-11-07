To get the app started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

Understanding the app
├── when the page first loads, it shows three shelves "Currently Reading", "Want to Read" and "Read" and the books in the respective shelves
├── clicking the + button at the bottom right loads the search page and allows you to type in search keywork
├── TO go back, simply click the icon on the top left of the search bar 
		├── search page can also reached by "/search" option
		├── home page can be accessed by "/" route access
├── Implemented debounce feature - Search on the search page will fire half a second after typing is finished
├── TODO: 
├──		1. The search currently doesn't hit the api but just searches by book title currently
├──	    2. remove warning and exceptions 
