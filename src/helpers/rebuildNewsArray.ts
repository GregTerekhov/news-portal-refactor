import { PartialPopularNewsArray } from 'types/news';

function rebuildNewsArray(data: PartialPopularNewsArray) {
  if (data) {
    const modifiedNewsResults = data?.map((item) => {
      return {
        // id: item?.id ?? -1,
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
}

export default rebuildNewsArray;
