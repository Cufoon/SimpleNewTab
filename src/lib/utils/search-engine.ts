export interface SearchEngine {
  key: string;
  name: string;
  url: (v: string) => string;
}

const bingEngine: SearchEngine = {
  key: 'bing',
  name: 'Bing',
  url: (v) => `https://www.bing.com/search?q=${encodeURIComponent(v)}`
};

const baiduEngine: SearchEngine = {
  key: 'baidu',
  name: 'Baidu',
  url: (v) => `https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent(v)}`
};

const googleEngine: SearchEngine = {
  key: 'google',
  name: 'Google',
  url: (v) => `http://www.google.com/search?q=${encodeURIComponent(v)}`
};

const duckduckgoEngine: SearchEngine = {
  key: 'duckduckgo',
  name: 'DuckDuckGO',
  url: (v) => `https://duckduckgo.com/?q=${encodeURIComponent(v)}`
};

export const engines: { [index: string]: SearchEngine } = {
  bing: bingEngine,
  baidu: baiduEngine,
  google: googleEngine,
  duckduckgo: duckduckgoEngine
};

export const engineList: SearchEngine[] = [
  bingEngine,
  baiduEngine,
  googleEngine,
  duckduckgoEngine
];

export default {
  engineList,
  engines
};
