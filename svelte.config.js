import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    appDir: 'cufoon_app',
    csp: {
      mode: 'auto',
      directives: {
        'default-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'script-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'img-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'media-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'script-src-elem': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'style-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'style-src-elem': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ],
        'worker-src': [
          'blob:',
          'data:',
          'filesystem:',
          'http:',
          'https:',
          'localhost',
          'localhost:*',
          'mediastream:',
          'self',
          'unsafe-eval',
          'unsafe-hashes',
          'unsafe-inline',
          'wasm-unsafe-eval'
        ]
      }
    },
    paths: {
      relative: false
    }
  }
};

export default config;
