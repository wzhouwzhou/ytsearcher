export const version: number;
export const validOptions: string[];

export type ResultType = 'youtube#video' | 'youtube#channel' | 'youtube#playlist';

export interface SearchOptions {
  part?: string;
  forContentOwner?: boolean;
  forDeveloper?: boolean;
  forMine?: boolean;
  relatedToVideoId?: string;
  channelId?: string;
  channelType?: 'any' | 'show';
  eventType?: 'completed' | 'live' | 'upcoming';
  fields?: string;
  location?: string;
  locationRadius?: string;
  maxResults?: number;
  onBehalfOfContentOwner?: string;
  order?:
    | 'date' 
    | 'rating'
    | 'relevance' 
    | 'title' 
    | 'videoCount' 
    | 'viewCount';
  pageToken?: string;
  publishedAfter?: string;
  publishedBefore?: string;
  q?: string;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: 'moderate' | 'none' | 'strict';
  topicId?: string;
  type?: 'channel' | 'playlist' | 'video';
  videoCaption?: 'any' | 'closedCaption' | 'none';
  videoCategoryId?: string;
  videoDefinition?: 'any' | 'high' | 'standard';
  videoDimension?: '2d' | '3d' | 'any';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoEmbeddable?: 'any' | 'true';
  videoLicense?: 'any' | 'creativeCommon' | 'youtube';
  videoSyndicated?: 'any' | 'true';
  videoType?: 'any' | 'episode' | 'movie';
}

export interface KeyData {
  key: string;
  revealKey?: string;
}

export interface VideoEntry extends Omit<ResultSnippet, 'publishedAt'> {
  kind: ResultType;
  id: string;
  url: string;
  publishedAt: Date;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  [key: string]: Thumbnail;
}

export interface ResultID {
  kind: ResultType;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface ResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface SearchResult {
  kind: 'youtube#searchResult';
  etag: string;
  id: ResultID;
  snippet: ResultSnippet;
}

export class YTSearch {
  public options?: SearchOptions;
  public timestamp: number;
  public query: string;
  public totalResults?: number | null;
  public pages?: number | null;
  public nextPageToken?: string;
  public prevPageToken?: string;
  public currentPage?: YTSearchPage;

  public constructor(query: string);

  public search(options?: SearchOptions, apiKey?: KeyData): Promise<this>;
  public nextPage(newOptions?: SearchOptions): Promise<null | this>;
  public prevPage(newOptions?: SearchOptions): Promise<null | this>;
}

export class YTSearcher {
  public defaultoptions?: SearchOptions;
  public first?: VideoEntry;

  public constructor(apiKey: string | KeyData, defaultoptions?: SearchOptions);

  public set key(newKey: string);
  public get key(): undefined | string;

  public search(query: string, options?: SearchOptions): YTSearch;
}

export class YTSearchPage extends Array<VideoEntry> {
  public constructor(items: SearchResult[]);

  public first(): VideoEntry | null;
  public last(): VideoEntry | null;
}
