export const version: number;
export const validOptions: string[];

export type Options = Record<string, unknown>;
export type ResultType = 'youtube#video' | 'youtube#channel' | 'youtube#playlist';

export interface KeyData {
  key: string;
  revealKey?: string;
}

export interface VideoEntry extends ResultSnippet {
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
  publishedAt: number;
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
  id: ResultID;
}

export class YTSearch {
  public options?: Options;
  public timestamp: number;

  public constructor(public query: string);

  public search(options?: Record<string, unknown>, apiKey?: KeyData): Promise<this>;
  public newPage(newOptions?: Options): Promise<null | this>;
  public prevPage(newOptions?: Options): Promise<null | this>;
}

export class YTSearcher {
  public totalResult?: number | null;
  public pages?: number | null;
  public nextPageToken?: string;
  public prevPageToken?: string;
  public currentPage?: YTSearchPage;
  public first?: Video;

  public constructor(apiKey: string | KeyData, public defaultoptions?: Options);

  public set key(newKey: string);
  public get key(): undefined | string;

  public search(query: string, options?: Options): YTSearch;
}

export class YTSearchPage extends Array<VideoEntry> {
  public constructor(items: SearchResult[]);

  public first(): VideoEntry | null;
  public last(): VideoEntry | null;
}
