import { ChromeSettingProps, defaultSetting } from './setting';
import { checkColor } from './color';

const asyncing = (runFn: any, cb: any, ...args: any[]): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    runFn(...args, (...params: any[]) => {
      const [ok, value]: [boolean, string] = cb(...params);
      if (ok) {
        resolve(value);
      } else {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

const setBackgroundColor = async (color: string) => {
  await asyncing(
    (p1: any, p2: any) => chrome.storage.local.set(p1, p2),
    () => [true, null],
    { backgroundColor: color }
  );
};

const getBackgroundColor = async (): Promise<string> => {
  try {
    const value = await asyncing(
      (p1: any, p2: any) => chrome.storage.local.get(p1, p2),
      (result: ChromeSettingProps) => {
        if (result && result.backgroundColor && checkColor(result.backgroundColor)) {
          return [true, result.backgroundColor];
        }
        return [false, null];
      },
      'backgroundColor'
    );

    return value;
  } catch (error) {
    return defaultSetting.backgroundColor;
  }
};

export const storage = {
  setBackgroundColor,
  getBackgroundColor
};
