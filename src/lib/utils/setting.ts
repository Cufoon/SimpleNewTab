export interface SettingProps {
  backgroundColor: string;
}

export type ChromeSettingProps = Partial<SettingProps>;

export const defaultSetting: SettingProps = {
  backgroundColor: 'rgba(240, 240, 240, 1)'
};
