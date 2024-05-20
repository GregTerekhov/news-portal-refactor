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

        const publishedDate = convertDateStringToDDMMYYY(published_date);
        const imageSrc = media?.[0]?.['media-metadata']?.[2]?.url;
        const imageAlt = media?.[0]?.caption;
        const author = byline?.replace(/^By\s+/i, '');

        return {
          ...commonFields,
          title: title ?? '',
          description: abstract ?? '',
          publishDate: publishedDate ?? '',
          category: section ?? '',
          edition: source ?? '',
          newsUrl: url ?? '',
          imgLink: imageSrc ?? '',
          imgAlt: imageAlt ?? '',
          author: author ?? '',
          materialType: type ?? '',
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

        const publishedDate = convertDateStringToDDMMYYY(pub_date);
        const imageSrc = multimedia?.[0]?.url && `https://static01.nyt.com/${multimedia?.[0]?.url}`;
        const author = byline ? byline?.original?.replace(/^By\s+/i, '') : '';

        return {
          ...commonFields,
          title: headline?.main ?? '',
          description: abstract ?? '',
          publishDate: publishedDate ?? '',
          category: section_name ?? '',
          edition: source ?? '',
          newsUrl: web_url ?? '',
          imgLink: imageSrc ?? '',
          imgAlt: lead_paragraph ?? '',
          author: author,
          materialType: type_of_material ?? '',
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

        const publishedDate = convertDateStringToDDMMYYY(published_date);
        const imageSrc = multimedia?.[2]?.url;
        const imageAlt = multimedia?.[0]?.caption;
        const author = byline ? byline.replace(/^By\s+/i, '') : '';

        return {
          ...commonFields,
          title: title ?? '',
          description: abstract ?? '',
          publishDate: publishedDate ?? '',
          category: section ?? '',
          edition: source ?? '',
          newsUrl: url ?? '',
          imgLink: imageSrc ?? '',
          imgAlt: imageAlt ?? '',
          author: author,
          materialType: material_type_facet ?? '',
        };
      }
    });

    return modifiedNewsResults;
  }
  return [];
}

export default rebuildingNewsArray;
