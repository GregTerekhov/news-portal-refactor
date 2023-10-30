export type PopularNewsItem = {
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
  // type: string;
  url: string;
};

export type ArticleNewsItem = {
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
  // type_of_material: string;
};

export type NewsWireItem = {
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
  // material_type_facet: string;
};

export type C = {
  display_name: string;
};

export type VotedItem = {
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
  // materialType: string;
};

export type VotedNewsArray = VotedItem[];
export type PartialVotedNewsArray = Partial<VotedItem>[];
export type PopularNewsArray = PopularNewsItem[];
export type PartialPopularNewsArray = Partial<PopularNewsItem>[];
export type ArticleNewsArray = ArticleNewsItem[];
export type PartialArticleNewsArray = Partial<ArticleNewsItem>[];
export type NewsWireArray = NewsWireItem[];
export type PartialNewsWireArray = Partial<NewsWireItem>[];
