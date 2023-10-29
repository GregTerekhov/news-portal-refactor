import { PartialGeneralNewsArray } from 'types/news';
import { VariantRender } from 'types/news';

function rebuildNewsArray(data: { queryType: string; newsData: PartialGeneralNewsArray } | null) {
  if (data?.queryType === VariantRender.Popular) {
    const modifiedNewsResults = data?.newsData.map((item) => {
      return {
        isFavourite: false,
        hasRead: false,
        title: item?.title,
        description: item?.abstract,
        publishDate: item?.published_date,
        category: item?.section ?? '',
        edition: item?.source ?? '',
        newsUrl: item?.url ?? '',
        imgLink: item?.media?.[0]?.['media-metadata']?.[2]?.url as string,
        imgAlt: item?.media?.[0]?.caption ?? '',
        author: item?.byline ? item.byline.replace(/^By\s+/i, '') : '',
      };
    });

    return modifiedNewsResults;
  }

  if (data?.queryType === VariantRender.Search) {
    const modifiedNewsResults = data?.newsData.map((item) => {
      // console.log(item.multimedia[0].url);
      return {
        isFavourite: false,
        hasRead: false,
        title: item?.headline?.main,
        description: item?.abstract,
        publishDate: item?.pub_date,
        category: item?.section_name ?? '',
        edition: item?.source ?? '',
        newsUrl: item?.web_url ?? '',
        // imgLink: item?.multimedia?.[0].url as string,
        // imgAlt: item?.multimedia?.[0]?.caption ?? '',
        author: item?.byline,
      };
    });

    return modifiedNewsResults;
  }

  if (data?.queryType === VariantRender.Categories) {
    const modifiedNewsResults = data?.newsData.map((item) => {
      // console.log(item.multimedia[0].url);
      return {
        isFavourite: false,
        hasRead: false,
        title: item?.title,
        description: item?.abstract,
        publishDate: item?.published_date,
        category: item?.section ?? '',
        edition: item?.source ?? '',
        newsUrl: item?.url ?? '',
        // imgLink: item?.multimedia?.[0].url as string,
        // imgAlt: item?.multimedia?.[0]?.caption ?? '',
        author: item?.byline,
      };
    });

    return modifiedNewsResults;
  }
}

export default rebuildNewsArray;
