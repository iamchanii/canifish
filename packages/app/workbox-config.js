const HOUR_SECONDS = 3_600;
const DAY_SECONDS = 86_400;

module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,js,ico,css}'],
  swDest: 'build/service-worker.js',
  skipWaiting: true,
  ignoreURLParametersMatching: [/./],
  runtimeCaching: [
    {
      urlPattern: /(?:\/)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'html',
        expiration: {
          maxAgeSeconds: DAY_SECONDS,
        },
      },
    },
    {
      urlPattern: new RegExp('https://canifish.now.sh/api/.+$'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api',
        expiration: {
          maxAgeSeconds: HOUR_SECONDS,
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxAgeSeconds: DAY_SECONDS * 30,
        },
      },
    },
    {
      urlPattern: new RegExp(
        'https://cdn.rawgit.com/innks/NanumSquareRound/master/NanumSquareRound.+(?:woff2?|eot|ttf)$',
      ),
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: DAY_SECONDS * 30,
        },
      },
    },
  ],
};
