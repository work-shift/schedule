import adapterNode from '@sveltejs/adapter-node';

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
    ssr: true,
    files: {
      serviceWorker: 'src/service-worker/index.mjs',
    },
    serviceWorker: {
      files: (filepath) => !/\.DS_STORE/.test(filepath),
    },
  },
};

export default config;
