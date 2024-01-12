// // Function for conversion JPG-image to webP
// export function convertToWebP(jpegImageURL: string | undefined, quality: number): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = jpegImageURL ?? '';

//     image.onload = function () {
//       canvas.width = image.width;
//       canvas.height = image.height;

//       context?.drawImage(image, 0, 0, image.width, image.height);

//       const webpImageURL = canvas.toDataURL('image/webp', quality);
//       console.log('webpImageURL', webpImageURL);
//       resolve(webpImageURL);
//     };

//     image.onerror = function (error) {
//       reject(error);
//     };
//   });
// }
