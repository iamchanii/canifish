import isEqual from 'fast-deep-equal';

type PromiseFn<T = any> = (...args: any[]) => Promise<T>;

interface PromiseCache {
  promise: Promise<any>;
  inputs?: any[];
  data?: any;
  error?: Error;
}

const promiseCacheMap = new Map<PromiseFn, PromiseCache[]>();

const usePromise = <T>(promiseFn: PromiseFn<T>, inputs: any[] = []): T => {
  let promiseCacheList = promiseCacheMap.get(promiseFn);

  if (!promiseCacheList) {
    promiseCacheMap.set(promiseFn, []);
    promiseCacheList = promiseCacheMap.get(promiseFn);
  } else if (promiseCacheList.length > 0) {
    for (const cache of promiseCacheList) {
      if (isEqual(cache.inputs, inputs)) {
        if (cache.data) {
          return cache.data;
        }

        throw cache.promise;
      }
    }
  }

  const promiseCache: PromiseCache = {
    promise: promiseFn(...inputs)
      .then((resolved) => (promiseCache.data = resolved))
      .catch((error) => (promiseCache.error = error)),
    inputs,
  };

  promiseCacheList!.push(promiseCache);

  throw promiseCache.promise;
};

export default usePromise;
