# YTSearcher
## A nodejs package that provides an easy-to-use promise-based system of getting youtube search results.

### Installing via NPM.

```$ npm install ytsearcher```

### Quick Start Guide
**Creating the object:**

    const { YTSearcher } = require('ytsearcher');
    const searcher = new YTSearcher(apikey);

For details on how to obtain an API key and create a project visit [this link](https://developers.google.com/youtube/v3/getting-started)

By default the api key will be irretrievable.
To enable access to `searcher.key` create the object like so:

    const searcher2 = new YTSearcher( {
      key: apiKey,
      revealkey: true,
    } );

**To Perform Searches**

This package interacts directly with google's api. The base url can be retrieved by doing
```const { apiurl } = require('ytsearcher');```

    // result will be a YTSearch object.
    let resultA = await searcher.search('A Search Query');

    // You can customize your search with like so:
    let resultB = await searcher.search('Another Query', searchOptions)

A list of options is available [here](https://developers.google.com/youtube/v3/docs/search/list)

Or you can fetch the list via:
```const { validOptions } = require('ytsearcher');``` which will return the array.

**Examples**

    // For example, to grab only video results from a search query:
    let resultC = await searcher.search('A Third Query', { type: 'video' });

    // This shortcut will log the first search result (in the active page).
    console.log(result.first);

    // This will log the url of the first search result (in the active page).
    console.log(result.first.url);

### Pagination

**A YTSearch has a built in page flipper, which will update the properties of YTSearch, including search.first.**

    // These will return null when the last and first page have been hit (respectively).
    await result.nextPage();
    await result.prevPage();

    // result.currentPage is an array of objects containing the current active page in the search object.
    const currentPage = result.currentPage

    // To print everything in the current page.
    console.log(currentPage);

    // You can also get individual elements from it like so:
    console.log(currentPage.first());
    console.log(currentPage.last());
    console.log(currentPage[1]);

### Summary example to get the url of the second result on the second page of a video-only search (assuming both the page and the result exist):

**For async methods:**

    const APIKEY = "12345"; // replace me
    const QUERY = "Anthing you want"; // replace me too

    const { YTSearcher } = require( 'ytsearcher' );
    const ytsearcher = new YTSearcher( APIKEY );

    const searchResult = await ytsearcher.search( QUERY, { type: 'video' } );

    const secondPage = await searchResult.nextPage();
    // secondPage is same object as searchResult

    const page = secondPage.currentPage;
    const videoEntry = page[1];

    console.log( videoEntry.url );

**For completely non-async methods:**

    const APIKEY = "12345"; // replace me
    const QUERY = "Anything you want"; // replace me too

    const { YTSearcher } = require( 'ytsearcher' );
    const ytsearcher = new YTSearcher( APIKEY );

    ytsearcher.search( QUERY, { type: 'video' } )
    .then( searchResult => {

      searchResult.nextPage()
      .then( secondPage => {
        // secondPage is same object as searchResult

        const page = secondPage.currentPage;
        const videoEntry = page[1];

        console.log( videoEntry.url );
      });
    });

The Search Query can be anything, including a youtube link itself.

Searches may error, and if an error code is available it will be in the error. A list of possible errors responses is available here: [https://developers.google.com/analytics/devguides/reporting/core/v3/errors](https://developers.google.com/analytics/devguides/reporting/core/v3/errors)

Full docs are available here: [http://ytsearcher.willyz.cf](https://ytsearcher.willyz.cf)
