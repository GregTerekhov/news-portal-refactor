import { Middleware } from '@reduxjs/toolkit';

export const nonSerializableMiddleware: Middleware = () => (next) => (action) => {
  if (action.error && action.payload && action.payload.response) {
    const { status, data, headers } = action.payload.response;

    const serializableAction = {
      ...action,
      payload: {
        status,
        message: data ? data.message : undefined,
        headers: headers ? headers.toJSON() : undefined,
      },
    };

    return next(serializableAction);
  }

  return next(action);
};
