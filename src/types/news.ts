export type PopularNewsItem = {
  abstract?: string;
  byline?: string;
  id: number;
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
  url: string;
};

export type ArticleNewsItem = {
  abstract?: string;
  snippet?: string;
  multimedia: {
    url?: string;
  }[];
  pub_date: string;
  section_name: string;
  source: string;
  headline: {
    main: string;
  };
  web_url: string;
};

export type VotedItem = {
  // id?: number;
  title: string;
  description?: string;
  isFavourite: boolean;
  hasRead: boolean;
  publishDate: string;
  edition?: string;
  author?: string;
  category: string;
  imgLink?: string;
  imgAlt?: string;
  newsUrl: string;
};

export enum VariantRender {
  Popular = 'popular',
  Search = 'search',
  Categories = 'categories',
}

export type VotedNewsArray = VotedItem[];
export type PartialVotedNewsArray = Partial<VotedItem>[];
export type PopularNewsArray = PopularNewsItem[];
export type PartialPopularNewsArray = Partial<PopularNewsItem>[];
