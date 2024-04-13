export type QueryParams = Record<string, string | object | number>;
export type UsedMethods = 'get' | 'post' | 'patch' | 'delete';

export interface AsyncThunkTemplateOptions {
  queryParams?: QueryParams;
  nestedObjectName?: string;
  responsePath?: string;
}
