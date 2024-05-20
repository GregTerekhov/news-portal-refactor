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

export interface CategoriesItem {
  display_name: string;
}

export type PopularNewsArray = PopularNewsItem[];
export type ArticleNewsArray = ArticleNewsItem[];
export type NewsWireArray = NewsWireItem[];

export type GeneralNewsArray = PopularNewsArray | ArticleNewsArray | NewsWireArray;
