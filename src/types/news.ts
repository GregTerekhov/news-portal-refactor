type VotedPartial<T> = { [P in keyof T]?: T[P] };

export interface PopularNewsItem {
  abstract?: string;
  byline?: string;
  media: {
    caption?: string;
    'media-metadata'?: {
      url?: string;
    }[];
  }[];
  published_date: string;
  section: string;
  source: string;
  title: string;
  type: string;
  url: string;
}

export interface ArticleNewsItem {
  abstract?: string;
  byline?: {
    original?: string;
  };
  lead_paragraph?: string;
  multimedia?: {
    url?: string;
  }[];
  pub_date: string;
  section_name: string;
  source: string;
  headline: {
    main: string;
  };
  web_url: string;
  type_of_material: string;
}

export interface NewsWireItem {
  section: string;
  title: string;
  abstract: string;
  url: string;
  byline?: string;
  source: string;
  published_date: string;
  multimedia?: {
    caption?: string;
    url?: string;
  }[];
  material_type_facet: string;
}

export interface C {
  display_name: string;
}

export interface IHistoryLog {
  title: string;
  category: string;
  newsUrl: string;
  additionDate: number;
  deletionDate: number;
}

export interface VotedItem {
  _id?: string;
  title: string;
  description?: string;
  isFavourite: boolean | undefined; // тимчасово для уникнення помилки типів в синхронній дії addOrUpdateVotedNews
  hasRead: boolean | undefined; // так само як описано вище
  publishDate: string;
  edition?: string;
  author?: string | undefined;
  category: string;
  imgLink?: string;
  imgAlt?: string;
  newsUrl: string;
  materialType?: string;
  additionDate?: number | null | undefined;
}

export type VotedNewsArray = VotedItem[];
export type PartialVotedNewsArray = VotedPartial<VotedItem>[];
export type PopularNewsArray = PopularNewsItem[];
export type PartialPopularNewsArray = Partial<PopularNewsItem>[];
export type ArticleNewsArray = ArticleNewsItem[];
export type PartialArticleNewsArray = Partial<ArticleNewsItem>[];
export type NewsWireArray = NewsWireItem[];
export type PartialNewsWireArray = Partial<NewsWireItem>[];

export interface SavedNewsResponse {
  code: number;
  message: string;
  data: PartialVotedNewsArray;
}

export interface HistoryLogResponse {
  code: number;
  message: string;
  data: IHistoryLog[];
}

export interface DeleteNewsResponse {
  code: number;
  message: string;
  _id: string;
}
