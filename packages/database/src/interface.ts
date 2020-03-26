export interface Database<T = any> {
  get: () => Promise<T>;
}
