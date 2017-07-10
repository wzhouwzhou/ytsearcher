'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

///////////////////////
// Utility constants //
///////////////////////

const querystring = require( 'querystring' );
const needle = require( 'needle' );
const Constants = require ( '../deps/Constants');
const { YTSearchPage } = require('./YTSearchPage');

/**
 * validOptions
 * An Array containing the valid keys search options may have
 *
 * @type {Array}
 */
const validOptions = Constants.validOptions;
/**
 * apiurl
 * A string representing Google's YouTube api url.
 *
 * @type {string}
 */
const apiurl = Constants.apiurl;

////////////////////
// YTSearch Class //
////////////////////

/**
 *  YTSearch class
 *  Represents a YouTube search result object that is returned by the YT Searcher
 *
 *  @type {YTSearch}
 */
const YTSearch = class YTSearch {

  /**
   * constructor - Creates a search object with a given query
   *
   * @param  {string}   query - The Search query
   * @return {YTSearch}       - The YTSearch object
   */
  constructor ( query ) {
    Object.defineProperty( this, 'query', {
      value: query,
    } );

    Object.defineProperty( this, 'timestamp', {
      value: Date.now(),
    } );
  }

  /**
   * search - Performs a search with given options.
   *
   * @memberof YTSearch
   * @instance
   * @param  {Object=} [options={}] - Optional search options
   * @return {YTSearch}             - The YTSearch object populated with search results.
   */
  search ( options ) {
    this.options = options||{};

    return new Promise( (res, rej) => {

      const searchParams = {
        maxResults: this.options.maxResults || 10,
        part: 'snippet',
        q: this.query,
        regionCode: this.options.regionCode||'US',
        type: ( () => {
          switch(!0){
            case this.options.type == 'all' : return 'video,channel,playlist';
            case typeof this.options.type == 'string' : return this.options.type;
            case !0 : return 'video';
          }
        } )()
      };

      for(const option of Object.keys(this.options))
        if (~validOptions.indexOf(option)) searchParams[option] = options[option];

      const queryUrl = `${apiurl}${querystring.stringify(searchParams)}`;

      needle.get( queryUrl, (error, response) => {
        if(error) rej(err);
        if(response.statusCode!=200) rej(`Error code: ${response.statusCode}`);
        const body = response.body;
        if(body.error) rej(body.error.message);

        this.totalResults = body.pageInfo?body.pageInfo.totalResults:null;
        this.pages = this.totalResults&&body.pageInfo.resultsPerPage?~~(this.totalResults/body.pageInfo.resultsPerPage)+1:null;

        this.nextPageToken = body.nextPageToken;
        this.prevPageToken = body.prevPageToken;

        this.currentPage = new YTSearchPage(body.items);
        this.first = this.currentPage.first();

        res ( this );
      } );
    } );
  }

  /**
   * nextPage - Updates the search object, populating it with data from the next page
   *
   * @memberof YTSearch
   * @instance
   * @method nextPage
   * @param  {Object=} [newOptions=this.options] - New search options, if given. Defaults to last used search options.
   * @return {YTSearch}                          - The Search result, or null if currentPage is already the last page.
   */
  nextPage ( newOptions = this.options ) {
    newOptions = Object.assign({}, newOptions, this.options);
    return new Promise( async (res, rej) => {
      if(!this.nextPageToken) res(null);

      try{
        res( await this.search(Object.assign( newOptions, {pageToken: this.nextPageToken})) );
      }catch(err){
        rej(err);
      }
    });
  }

  /**
   * prevPage - Updates the search object, populating it with data from the previous page
   *
   * @memberof YTSearch
   * @instance
   * @method prevPage
   * @param  {Object=} [newOptions=this.options] - New search options, if given. Defaults to last used search options.
   * @return {YTSearch}                          - The Search result, or null if currentPage is already the first page.
   */
  prevPage ( newOptions = {} ) {
    newOptions = Object.assign({}, newOptions, this.options);
    return new Promise( async (res, rej) => {
      if(!this.prevPageToken) res(null);

      try{
        res( await this.search(Object.assign(newOptions, {pageToken: this.prevPageToken})) );
      }catch(err){
        rej(err);
      }
    });
  }
};

exports.YTSearch = YTSearch;
