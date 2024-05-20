export interface ServicesInfo {
  code: number;
  message: string;
}

export enum RequestStatus {
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Undefined = '',
}
