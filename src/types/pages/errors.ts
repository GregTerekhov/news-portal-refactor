type ServerErrorCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 | 511;

type ErrorWarning =
  | 'Internal Server Error'
  | 'Not Implemented'
  | 'Bad Gateway'
  | 'Service Unavailable'
  | 'Gateway Timeout'
  | 'HTTP Version Not Supported'
  | 'Variant Also Negotiates'
  | 'Insufficient Storage'
  | 'Loop Detected'
  | 'Not Extended'
  | 'Network Authentication Required';

type ErrorMessage =
  | 'This is generic server error message. You see this because an unexpected condition was encountered and no more specific message is suitable'
  | 'The server either does not recognize the request method, or it lacks the ability to fulfil the request'
  | 'The server might acting as a gateway or proxy and received an invalid response from the upstream server'
  | 'The server cannot handle the request (because it is overloaded or down for maintenance)'
  | 'The server might acting as a gateway or proxy and did not receive a timely response from the upstream server'
  | 'The server does not support the HTTP version used in the request'
  | 'Transparent content negotiation for the request results in a circular reference'
  | 'The server is unable to store the representation needed to complete the request'
  | 'The server detected an infinite loop while processing the request'
  | 'Further extensions to the request are required for the server to fulfil it'
  | 'The client needs to authenticate to gain network access';

export type ErrorList = {
  code: ServerErrorCode;
  warning: ErrorWarning;
  message: ErrorMessage;
};
