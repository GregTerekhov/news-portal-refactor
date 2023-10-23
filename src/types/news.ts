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

export type VotedItem = {
  id: number;
  title: string;
  description?: string;
  isFavourite: boolean;
  hasRead: boolean;
  publishDate: string;
  edition: string;
  author?: string;
  category: string;
  imgLink: string;
  imgAlt?: string;
  newsUrl: string;
};

export type VotedNewsArray = VotedItem[];
export type PartialVotedNewsArray = Partial<VotedItem>[];
export type PopularNewsArray = PopularNewsItem[];
export type PartialPopularNewsArray = Partial<PopularNewsItem>[];
