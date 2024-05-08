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
        const { title, abstract, published_date, section, source, url, media, byline, type } =
          item as PopularNewsItem;

        return {
          ...commonFields,
          title: title || '',
          description: abstract || '',
          publishDate: convertDateStringToDDMMYYY(published_date) || '',
          category: section || '',
          edition: source || '',
          newsUrl: url || '',
          imgLink: media?.[0]?.['media-metadata']?.[2]?.url || '',
          imgAlt: media?.[0]?.caption || '',
          author: byline?.replace(/^By\s+/i, '') || '',
          materialType: type || '',
        };
      } else if ('headline' in item) {
        const {
          headline,
          abstract,
          pub_date,
          section_name,
          source,
          web_url,
          multimedia,
          lead_paragraph,
          byline,
          type_of_material,
        } = item as ArticleNewsItem;

        return {
          ...commonFields,
          title: headline?.main || '',
          description: abstract || '',
          publishDate: convertDateStringToDDMMYYY(pub_date) || '',
          category: section_name || '',
          edition: source || '',
          newsUrl: web_url || '',
          imgLink:
            (multimedia?.[0]?.url && `https://static01.nyt.com/${multimedia?.[0]?.url}`) || '',
          imgAlt: lead_paragraph || '',
          author: byline ? byline?.original?.replace(/^By\s+/i, '') : '',
          materialType: type_of_material || '',
        };
      } else {
        const {
          title,
          abstract,
          published_date,
          section,
          source,
          url,
          multimedia,
          byline,
          material_type_facet,
        } = item as NewsWireItem;

        return {
          ...commonFields,
          title: title || '',
          description: abstract || '',
          publishDate: convertDateStringToDDMMYYY(published_date) || '',
          category: section || '',
          edition: source || '',
          newsUrl: url || '',
          imgLink: multimedia?.[2]?.url || '',
          imgAlt: multimedia?.[0]?.caption || '',
          author: byline ? byline.replace(/^By\s+/i, '') : '',
          materialType: material_type_facet || '',
        };
      }
    });

    return modifiedNewsResults;
  }
  return [];
}

export default rebuildingNewsArray;
