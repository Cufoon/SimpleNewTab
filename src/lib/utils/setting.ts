export interface SettingProps {
  searchPosition: string;
  searchEngine: string;
}

export type ChromeSettingProps = Partial<SettingProps>;

export const defaultSetting: SettingProps = {
  searchPosition: 'top',
  searchEngine: 'bing'
};
