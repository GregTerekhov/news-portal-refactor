import { AxiosHeaders } from 'axios';
import { Middleware } from 'redux';

const serializeHeaders = (headers: AxiosHeaders) => {
  const headersObject: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    headersObject[key] = value;
  }
  // headers.forEach((value, key) => {
  //   headersObject[key] = value;
  // });
  return headersObject;
};

const serializePayload = (payload: any) => {
  if (payload && payload.headers instanceof Headers) {
    return {
      ...payload,
      headers: serializeHeaders(payload.headers),
    };
  }
  return payload;
};

const nonSerializableMiddleware: Middleware = () => (next) => (action) => {
  const serializableAction = {
    ...action,
    payload: serializePayload(action.payload),
  };

  return next(serializableAction);
};

export default nonSerializableMiddleware;

// const nonSerializableMiddleware: Middleware = () => (next) => (action) => {
//   if (action.payload && action.payload.headers instanceof Headers) {
//     const headers = serializeHeaders(action.payload.headers);
//     const modifiedPayload = { ...action.payload, headers };
//     const modifiedAction = { ...action, payload: modifiedPayload };
//     return next(modifiedAction);
//   }

//   return next(action);
// };

// export default nonSerializableMiddleware;
