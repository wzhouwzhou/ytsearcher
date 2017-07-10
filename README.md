# YTSearcher
## A nodejs package that provides an easy-to-use promise-based system of getting youtube search results.

### Installing via NPM.

```$ npm install ytsearcher```

### Quick Start Guide
**Creating the object:**

    const { YTSearcher } = require('ytsearcher');
    const searcher = new YTSearcher(apikey);

For details on how to obtain an API key and create a project visit [this link](https://developers.google.com/youtube/v3/getting-started)

By default the api key will be irretrievable. To enable access to `searcher.key` create the object like so:

    const searcher2 = new YTSearcher( {
      key: apiKey,
      revealkey: true,
    } );

**To Perform Searches**

    // result will be a YTSearch object.
    let resultA = await searcher.search('A Search Query');

    // You can customize your search with like so:
    let resultB = await searcher.search('Another Query', searchOptions)

A list of options is available [here](https://developers.google.com/youtube/v3/docs/search/list)

    // For example, to grab only video results from a search query:
    let resultC = await searcher.search('A Third Query', { type: 'video' });


    // This will log the first search result.
    console.log(result.first);

    // This will log the url of the first search result.
    console.log(result.first.url);

    // A YTSearch has a built in page flipper, which will update the properties of YTSearch, including `first`. These will return null when the last and first page have been hit (respectively).
    await result.nextPage();
    await result.prevPage();


The Search Query can be anything, including a youtube link itself.

Full docs are available here: [http://ytsearcher.willyz.cf](https://ytsearcher.willyz.cf)
