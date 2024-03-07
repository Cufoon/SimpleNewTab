import localforage from 'localforage';

enum KEY {
  SEARCH_POSITION = 'search.position',
  SEARCH_ENGINE = 'search.engine'
}

type AnyRecord = Record<KEY, unknown>;

interface Storage extends AnyRecord {
  [KEY.SEARCH_POSITION]: string;
  [KEY.SEARCH_ENGINE]: string;
}

type AsyncGet<T extends KEY> = Promise<Storage[T] | null>;

async function getItem(
  key: `${KEY.SEARCH_ENGINE}`
): AsyncGet<KEY.SEARCH_ENGINE>;
async function getItem(
  key: `${KEY.SEARCH_POSITION}`
): AsyncGet<KEY.SEARCH_POSITION>;
async function getItem(key: `${KEY}`): AsyncGet<KEY> {
  try {
    return await localforage.getItem<Storage[typeof key]>(key);
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function setItem(
  key: `${KEY.SEARCH_ENGINE}`,
  value: Storage[KEY.SEARCH_ENGINE]
): Promise<boolean>;
async function setItem(
  key: `${KEY.SEARCH_POSITION}`,
  value: Storage[KEY.SEARCH_POSITION]
): Promise<boolean>;
async function setItem(key: `${KEY}`, value: Storage[KEY]): Promise<boolean> {
  try {
    await localforage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function removeItem(key: `${KEY}`) {
  try {
    await localforage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

const getSearchPosition = () => getItem(KEY.SEARCH_POSITION);
const setSearchPosition = (value: Storage[KEY.SEARCH_POSITION]) =>
  setItem(KEY.SEARCH_POSITION, value);
const removeSearchPosition = () => removeItem(KEY.SEARCH_POSITION);

const getSearchEngine = () => getItem(KEY.SEARCH_ENGINE);
const setSearchEngine = (value: Storage[KEY.SEARCH_ENGINE]) =>
  setItem(KEY.SEARCH_ENGINE, value);
const removeSearchEngine = () => removeItem(KEY.SEARCH_ENGINE);

const clear = async () => {
  try {
    await localforage.clear();
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default {
  getSearchPosition,
  setSearchPosition,
  removeSearchPosition,
  getSearchEngine,
  setSearchEngine,
  removeSearchEngine,
  clear
};
