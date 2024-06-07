export interface INews {
  source?: {};
  author?: null | string;
  title?: string;
  description?: null | string;
  url?: URL;
  urlToImage?: null | string;
  publishedAt?: string;
  content?: string | null;
}
