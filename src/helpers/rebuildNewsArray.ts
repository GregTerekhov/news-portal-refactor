import { PartialArticleNewsArray, PartialPopularNewsArray } from 'types/news';

function rebuildNewsArray(data: PartialPopularNewsArray | PartialArticleNewsArray) {
  if (data) {
    const modifiedNewsResults = data.map((item) => {
      const title = 'title' in item ? item.title : 'headline' in item ? item?.headline?.main : '';
      const description = item.abstract;
      const publishDate =
        'published_date' in item ? item.published_date : 'pub_date' in item ? item.pub_date : '';
      const category =
        'section' in item ? item.section : 'section_name' in item ? item.section_name : '';
      const edition = item.source || '';
      const newsUrl = 'url' in item ? item.url : 'web_url' in item ? item.web_url : '';
      const imgLink =
        'media' in item
          ? item.media?.[0]?.['media-metadata']?.[2]?.url
          : 'multimedia' in item
          ? item.multimedia?.[0]?.url
          : '';
      const imgAlt =
        'media' in item
          ? item.media?.[0]?.caption
          : 'lead_paragraph' in item
          ? item.lead_paragraph
          : '';
      const author =
        'byline' in item
          ? typeof item.byline === 'string'
            ? item.byline.replace(/^By\s+/i, '')
            : item?.byline?.original?.replace(/^By\s+/i, '')
          : '';

      return {
        isFavourite: false,
        hasRead: false,
        title,
        description,
        publishDate,
        category,
        edition,
        newsUrl,
        imgLink,
        imgAlt,
        author,
      };
    });

    return modifiedNewsResults;
  }
}

export default rebuildNewsArray;

// import { PartialArticleNewsArray, PartialPopularNewsArray } from 'types/news';

// function rebuildNewsArray(data: PartialPopularNewsArray | PartialArticleNewsArray) {
//   if (data) {
//     const modifiedNewsResults = data?.map((item) => {
//       return {
//         isFavourite: false,
//         hasRead: false,
//         title: item?.title || item?.headline.main || '',
//         description: item?.abstract,
//         publishDate: item?.published_date || item?.pub_date || '',
//         category: item?.section || item?.section_name || '',
//         edition: item?.source || '',
//         newsUrl: item?.url || item?.web_url || '',
//         imgLink: item?.media?.[0]?.['media-metadata']?.[2]?.url || item?.multimedia?.[0]?.url || '',
//         imgAlt: item?.media?.[0]?.caption || item?.lead_paragraph || '',
//         author: item?.byline
//           ? item?.byline.replace(/^By\s+/i, '') || item?.byline?.original.replace(/^By\s+/i, '')
//           : '',
//       };
//     });

//     return modifiedNewsResults;
//   }
// }

// export default rebuildNewsArray;
