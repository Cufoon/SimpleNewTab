import localforage from 'localforage';

enum KEY {
  BACKGROUND_COLOR = 'background.color'
}

type AnyRecord = Record<KEY, unknown>;

interface Storage extends AnyRecord {
  [KEY.BACKGROUND_COLOR]: string;
}

type AsyncGet<T extends KEY> = Promise<Storage[T] | null>;

async function getItem(key: `${KEY.BACKGROUND_COLOR}`): AsyncGet<KEY.BACKGROUND_COLOR>;
async function getItem(key: `${KEY}`): AsyncGet<KEY> {
  try {
    return await localforage.getItem<Storage[typeof key]>(key);
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function setItem(
  key: `${KEY.BACKGROUND_COLOR}`,
  value: Storage[KEY.BACKGROUND_COLOR]
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

const getBackgroundColor = () => getItem(KEY.BACKGROUND_COLOR);
const setBackgroundColor = (value: Storage[KEY.BACKGROUND_COLOR]) =>
  setItem(KEY.BACKGROUND_COLOR, value);
const removeBackgroundColor = () => removeItem(KEY.BACKGROUND_COLOR);

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
  getBackgroundColor,
  setBackgroundColor,
  removeBackgroundColor,
  clear
};
