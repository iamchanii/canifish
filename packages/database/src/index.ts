export interface Database<T = any> {
  get: () => Promise<any>;
}

export const fishDatabase: Database<any> = {
  async get() {
    return null;
  },
};
