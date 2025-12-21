/** generic interface for key value pairs */
export interface KeyValuePair<T = any> {
  key: string;
  value: T;
}
