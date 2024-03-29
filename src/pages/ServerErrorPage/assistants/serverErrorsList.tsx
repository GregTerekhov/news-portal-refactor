export type ErrorList = {
  code: number;
  warning: string;
  message: string;
};

export const serverErrorsList: ErrorList[] = [
  {
    code: 500,
    warning: 'Internal Server Error',
    message:
      'This is generic server error message. You see this because an unexpected condition was encountered and no more specific message is suitable',
  },
  {
    code: 501,
    warning: 'Not Implemented',
    message:
      'The server either does not recognize the request method, or it lacks the ability to fulfil the request',
  },
  {
    code: 502,
    warning: 'Bad Gateway',
    message:
      'The server might acting as a gateway or proxy and received an invalid response from the upstream server',
  },
  {
    code: 503,
    warning: 'Service Unavailable',
    message:
      'The server cannot handle the request (because it is overloaded or down for maintenance)',
  },
  {
    code: 504,
    warning: 'Gateway Timeout',
    message:
      'The server might acting as a gateway or proxy and did not receive a timely response from the upstream server',
  },
  {
    code: 505,
    warning: 'HTTP Version Not Supported',
    message: 'The server does not support the HTTP version used in the request',
  },
  {
    code: 506,
    warning: 'Variant Also Negotiates',
    message: 'Transparent content negotiation for the request results in a circular reference',
  },
  {
    code: 507,
    warning: 'Insufficient Storage',
    message: 'The server is unable to store the representation needed to complete the request',
  },
  {
    code: 508,
    warning: 'Loop Detected',
    message: 'The server detected an infinite loop while processing the request',
  },
  {
    code: 510,
    warning: 'Not Extended',
    message: 'Further extensions to the request are required for the server to fulfil it',
  },
  {
    code: 511,
    warning: 'Network Authentication Required',
    message: 'The client needs to authenticate to gain network access',
  },
];
