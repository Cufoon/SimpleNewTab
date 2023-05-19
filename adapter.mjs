import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import glob from 'tiny-glob';
import sjcl from 'sjcl';

const manifest_filename = 'manifest.json';

function hash_script(s) {
  const hashed = sjcl.hash.sha256.hash(s);
  return sjcl.codec.base64.fromBits(hashed);
}

function generate_manifest() {
  return {
    manifest_version: 3,
    name: 'Simple Newtab',
    version: '1.3.0',
    description: 'Just a clean new tab page.',
    permissions: ['storage'],
    chrome_url_overrides: {
      newtab: 'index.html'
    },
    icons: {
      16: 'icons/16.png',
      32: 'icons/32.png',
      48: 'icons/48.png',
      128: 'icons/128.png'
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'"
    }
  };
}

// Quick and dirty helper function to externalize scripts. Will become obsolete once kit provides a config option to do this ahead of time.
function externalizeScript(html, assets) {
  return html.replace(
    /<script type="module" data-hydrate="([\s\S]+)">([\s\S]+)<\/script>/,
    (match, hydrationTarget, content) => {
      const hash = Buffer.from(hash_script(content), 'base64').toString('hex');
      const externalized_script_path = join(assets, `${hash}.js`);
      writeFileSync(externalized_script_path, content);
      return `<script type="module" data-hydrate="${hydrationTarget}" src="${hash}.js"></script>`;
    }
  );
}

/** @param {{assets: string, pages: string}} options */
export default function (options) {
  /** @type {import('@sveltejs/kit').Adapter} */
  const adapter = {
    name: 'cufoon-sveltekit-adapter-for-develop-browser-extension',

    async adapt(builder) {
      builder.rimraf(options.assets);
      builder.rimraf(options.pages);

      builder.writeClient(options.assets);
      builder.writePrerendered(options.pages);

      /**
       * The content security policy of manifest_version 3 does not allow for inlined scripts.
       * Until kit implements a config option (#1776) to externalize scripts, the below code block should do
       * for a quick and dirty externalization of the scripts' contents
       */
    //   const HTML_files = await glob('**/*.html', {
    //     cwd: options.pages,
    //     dot: true,
    //     absolute: true,
    //     filesOnly: true
    //   });
    //   HTML_files.forEach((path) => {
    //     let html = readFileSync(path, { encoding: 'utf8' });
    //     html = externalizeScript(html, options.assets);
    //     writeFileSync(path, html);
    //   });

      const generated_manifest = generate_manifest();
      writeFileSync(join(options.assets, manifest_filename), JSON.stringify(generated_manifest));
    }
  };

  return adapter;
}
