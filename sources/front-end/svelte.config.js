import adapterNode from '@sveltejs/adapter-node';

/*
  WEB WORKERS related: https://twitter.com/dassurma/status/1467567498837045256?s=12
*/

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    format: 'esm',
    hydratable: true,
  },
  extensions: ['.svelte'],
  kit: {
    adapter: adapterNode({
      precompress: true,
    }),
    // hydrate the <div id="macaroons-berlin"> element in src/app.html
    target: '#schedule',
    hydrate: true,
    router: true,
    ssr: false,
    files: {
      serviceWorker: 'src/service-worker/index.mjs',
    },
    serviceWorker: {
      files: (filepath) => !/\.DS_STORE/.test(filepath),
    },
  },
};

export default config;
