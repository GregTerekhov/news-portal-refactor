export type QueryParams = Record<string, string | object | number>;
export enum HTTPMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum SliceName {
  Auth = 'auth',
  APINews = 'newsAPI',
  DB = 'newsDB',
  Weather = 'weather',
  Filter = 'filter',
}

export enum DispatchActionType {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export interface AsyncThunkTemplateOptions {
  queryParams?: QueryParams;
  nestedObjectName?: NestedAPIObject;
  responsePath?: NestedAPIObject;
}

export enum NestedAPIObject {
  NewsResults = 'results',
  NewsArticle = 'response',
  NewsArticleDocs = 'docs',
  WeatherByHour = 'list',
}

export enum OperationName {
  SignUp = 'auth/signUp',
  SignIn = 'auth/signIn',
  CryptoData = 'auth/cryptoData',
  SignOut = 'auth/signOut',
  CurrentUser = 'auth/current',
  UpdateEmail = 'auth/updateEmail',
  UpdatePassword = 'auth/updatePassword',
  SendRecoveryEmail = 'auth/recoveryPasswordRequest',
  PasswordChange = 'auth/recoveryPasswordChange',
  GoogleAuth = 'auth/googleAuth',
  GoogleBind = 'auth/googleBind',
  GoogleUnbind = 'auth/googleUnbind',
  UpdateTheme = 'auth/updateTheme',
  SetTokens = 'auth/setTokens',
  NotAuthToggleTheme = 'notAuth/changeTheme',
  FetchPopular = 'newsAPI/popular/fetchPopular',
  FetchByKeyword = 'newsAPI/article/fetchByKeyword',
  GetCategoriesList = 'newsAPI/newsWire/categoriesList',
  FetchByCategory = 'newsAPI/newsWire/fetchByCategory',
  FetchByDate = 'newsAPI/article/fetchByDate',
  ChangeHeadline = 'newsAPI/changeHeadline',
  GetSavedNews = 'newsDB/all',
  AddNews = 'newsDB/add',
  DeleteNews = 'newsDB/delete',
  GetFavourite = 'newsDB/favourite/all',
  GetRead = 'newsDB/read/all',
  GetArchive = 'newsDB/archive/all',
  GetLog = 'newsDB/historyLog/all',
  ClearLog = 'newsDB/historyLog/clear',
  RemoveFavourite = 'newsDB/removeFromFavourites',
  CurrentWeather = 'weather/fetch',
  WeatherByHours = 'weather/hourlyForecast',
  Filters = 'filters/filtering',
}

export enum Routes {
  SignUp = '/auth/sign-up',
  SignIn = '/auth/sign-in',
  CryptoData = '/auth/get-password',
  SignOut = '/auth/sign-out',
  Refresh = '/auth/refresh',
  CurrentUser = '/auth/current-user',
  UpdateEmail = '/auth/update-email',
  UpdatePassword = '/auth/update-password',
  SendRecoveryEmail = '/auth/forgot-password-request',
  PasswordChange = '/auth/forgot-password-change',
  GoogleAuth = '/auth/google/auth',
  GoogleBind = '/auth/google/bind',
  GoogleUnbind = '/auth/google/unbind',
  UpdateTheme = '/auth/update-theme',
  PopularNews = '/mostpopular/v2/viewed/:period.json',
  NewsByKeyword = '/search/v2/articlesearch.json',
  NewsByCategory = '/news/v3/content/all/:section.json',
  NewsByDate = '/search/v2/articlesearch.json',
  CategoriesList = '/news/v3/content/section-list.json',
  GetAllAndAddNews = '/news',
  SavedFavourite = '/news/favourite',
  SavedRead = '/news/read',
  SavedArchive = '/news/archive',
  SavedLog = '/news/history-log',
  DeleteNews = '/news/archive/_id',
  ClearLog = '/news/delete-log',
  CurrentWeather = '/data/2.5/weather',
  WeatherByHours = '/data/2.5/forecast',
}
