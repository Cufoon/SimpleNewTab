export interface SettingProps {
  backgroundColor: string;
  searchEngine: string;
}

export type ChromeSettingProps = Partial<SettingProps>;

export const defaultSetting: SettingProps = {
  backgroundColor: 'rgba(240, 240, 240, 1)',
  searchEngine: 'bing'
};
