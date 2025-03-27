export interface CountryNowResponse<T> {
  error: boolean;
  msg: string;
  data: T[];
}
