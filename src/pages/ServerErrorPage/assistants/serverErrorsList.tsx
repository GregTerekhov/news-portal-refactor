import { ServerErrorCode, ServerErrorMessage, ServerErrorWarning, type ErrorList } from 'types';

export const serverErrorsList: readonly ErrorList[] = [
  {
    code: ServerErrorCode.InternalServerError,
    warning: ServerErrorWarning.InternalServerError,
    message: ServerErrorMessage.InternalServerError,
  },
  {
    code: ServerErrorCode.NotImplemented,
    warning: ServerErrorWarning.NotImplemented,
    message: ServerErrorMessage.NotImplemented,
  },
  {
    code: ServerErrorCode.BadGateway,
    warning: ServerErrorWarning.BadGateway,
    message: ServerErrorMessage.BadGateway,
  },
  {
    code: ServerErrorCode.ServiceUnavailable,
    warning: ServerErrorWarning.ServiceUnavailable,
    message: ServerErrorMessage.ServiceUnavailable,
  },
  {
    code: ServerErrorCode.GatewayTimeout,
    warning: ServerErrorWarning.GatewayTimeout,
    message: ServerErrorMessage.GatewayTimeout,
  },
  {
    code: ServerErrorCode.HTTPVersionNotSupported,
    warning: ServerErrorWarning.HTTPVersionNotSupported,
    message: ServerErrorMessage.HTTPVersionNotSupported,
  },
  {
    code: ServerErrorCode.VariantAlsoNegotiates,
    warning: ServerErrorWarning.VariantAlsoNegotiates,
    message: ServerErrorMessage.VariantAlsoNegotiates,
  },
  {
    code: ServerErrorCode.InsufficientStorage,
    warning: ServerErrorWarning.InsufficientStorage,
    message: ServerErrorMessage.InsufficientStorage,
  },
  {
    code: ServerErrorCode.LoopDetected,
    warning: ServerErrorWarning.LoopDetected,
    message: ServerErrorMessage.LoopDetected,
  },
  {
    code: ServerErrorCode.NotExtended,
    warning: ServerErrorWarning.NotExtended,
    message: ServerErrorMessage.NotExtended,
  },
  {
    code: ServerErrorCode.NetworkAuthenticationRequired,
    warning: ServerErrorWarning.NetworkAuthenticationRequired,
    message: ServerErrorMessage.NetworkAuthenticationRequired,
  },
];
