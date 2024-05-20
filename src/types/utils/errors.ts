export enum ServerErrorCode {
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}
export enum ServerErrorWarning {
  InternalServerError = 'Internal Server Error',
  NotImplemented = 'Not Implemented',
  BadGateway = 'Bad Gateway',
  ServiceUnavailable = 'Service Unavailable',
  GatewayTimeout = 'Gateway Timeout',
  HTTPVersionNotSupported = 'HTTP Version Not Supported',
  VariantAlsoNegotiates = 'Variant Also Negotiates',
  InsufficientStorage = 'Insufficient Storage',
  LoopDetected = 'Loop Detected',
  NotExtended = 'Not Extended',
  NetworkAuthenticationRequired = 'Network Authentication Required',
}

export enum ServerErrorMessage {
  InternalServerError = 'This is generic server error message. You see this because an unexpected condition was encountered and no more specific message is suitable',
  NotImplemented = 'The server either does not recognize the request method, or it lacks the ability to fulfil the request',
  BadGateway = 'The server might acting as a gateway or proxy and received an invalid response from the upstream server',
  ServiceUnavailable = 'The server cannot handle the request (because it is overloaded or down for maintenance)',
  GatewayTimeout = 'The server might acting as a gateway or proxy and did not receive a timely response from the upstream server',
  HTTPVersionNotSupported = 'The server does not support the HTTP version used in the request',
  VariantAlsoNegotiates = 'Transparent content negotiation for the request results in a circular reference',
  InsufficientStorage = 'The server is unable to store the representation needed to complete the request',
  LoopDetected = 'The server detected an infinite loop while processing the request',
  NotExtended = 'Further extensions to the request are required for the server to fulfil it',
  NetworkAuthenticationRequired = 'The client needs to authenticate to gain network access',
}

export interface ErrorList {
  code: ServerErrorCode;
  warning: ServerErrorWarning;
  message: ServerErrorMessage;
}
