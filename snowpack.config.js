// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type { import("snowpack").SnowpackUserConfig } */
// eslint-disable-next-line no-undef
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/' },
    'src/fonts': { url: '/fonts', static: true },
    'src/images': { url: '/images', static: true },
    'src/styles': { url: '/styles', static: true },
    'src/libs': { url: '/libs', static: true }
  },
  plugins: ['@snowpack/plugin-sass'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {},
  packageOptions: {},
  devOptions: {},
  buildOptions: {}
};
