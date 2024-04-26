import type { PopularNewsItem, ArticleNewsItem, NewsWireItem, GeneralNewsArray } from 'types';

import { convertDateStringToDDMMYYY } from 'helpers';

function rebuildingNewsArray(data: GeneralNewsArray) {
  if (data) {
    const modifiedNewsResults = data.map((item) => {
      const commonFields = {
        isFavourite: false,
        hasRead: false,
        additionDate: null,
      };

      if ('media' in item) {
        const popularNewsItem = item as PopularNewsItem;
        return {
          ...commonFields,
          title: popularNewsItem.title || '',
          description: popularNewsItem.abstract || '',
          publishDate: convertDateStringToDDMMYYY(popularNewsItem.published_date) || '',
          category: popularNewsItem.section || '',
          edition: popularNewsItem.source || '',
          newsUrl: popularNewsItem.url || '',
          imgLink: popularNewsItem.media?.[0]?.['media-metadata']?.[2]?.url || '',
          imgAlt: popularNewsItem.media?.[0]?.caption || '',
          author: popularNewsItem?.byline?.replace(/^By\s+/i, '') || '',
          materialType: popularNewsItem?.type || '',
        };
      } else if ('headline' in item) {
        const articleNewsItem = item as ArticleNewsItem;
        return {
          ...commonFields,
          title: articleNewsItem.headline?.main || '',
          description: articleNewsItem.abstract || '',
          publishDate: convertDateStringToDDMMYYY(articleNewsItem.pub_date) || '',
          category: articleNewsItem.section_name || '',
          edition: articleNewsItem.source || '',
          newsUrl: articleNewsItem.web_url || '',
          imgLink:
            (articleNewsItem?.multimedia?.[0]?.url &&
              `https://static01.nyt.com/${articleNewsItem?.multimedia?.[0]?.url}`) ||
            '',
          imgAlt: articleNewsItem?.lead_paragraph || '',
          author: articleNewsItem?.byline
            ? articleNewsItem?.byline?.original?.replace(/^By\s+/i, '')
            : '',
          materialType: articleNewsItem?.type_of_material || '',
        };
      } else {
        const newsWireItem = item as NewsWireItem;
        return {
          ...commonFields,
          title: newsWireItem?.title || '',
          description: newsWireItem?.abstract || '',
          publishDate: convertDateStringToDDMMYYY(newsWireItem.published_date) || '',
          category: newsWireItem.section || '',
          edition: newsWireItem.source || '',
          newsUrl: newsWireItem.url || '',
          imgLink: newsWireItem.multimedia?.[2]?.url || '',
          imgAlt: newsWireItem?.multimedia?.[0]?.caption || '',
          author: newsWireItem.byline ? newsWireItem.byline.replace(/^By\s+/i, '') : '',
          materialType: newsWireItem?.material_type_facet || '',
        };
      }
    });

    return modifiedNewsResults;
  }
  return [];
}

export default rebuildingNewsArray;
