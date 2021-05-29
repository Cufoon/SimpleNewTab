import React, { useEffect, useState } from 'react';
import cns from 'classnames';
import { storage } from '@/utils/chrome';
import { defaultSetting } from '@/utils/setting';
import SearchBar from '@/components/search-bar';
import ColorPicker from '@/components/color-picker';
import SwitchSetting from '@/components/switch-setting';

import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>(defaultSetting.backgroundColor);
  const [showSetting, setShowSetting] = useState<boolean>(false);

  const switchShowSetting = () => {
    setShowSetting((pre) => !pre);
  };

  const onBgColorSave = (value: string) => {
    setBgColor(value);
    storage.setBackgroundColor(value);
  };

  useEffect(() => {
    (async () => {
      const defaultColor = await storage.getBackgroundColor();
      setBgColor(defaultColor);
    })();
  }, []);

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      <div className={styles.header}>
        <div className={styles.settingIcon}>
          <SwitchSetting open={showSetting} changeOpen={switchShowSetting} bgColor={bgColor} />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.leftPart}>
          <div className={`${styles.title} web_font`}>遇见更好的自己，和更好的你。</div>
          <SearchBar />
        </div>
        <div className={cns(styles.rightPart, { [styles.rightPartOpen]: showSetting })}>
          <div className={styles.settingPanel}>
            <div className={styles.option}>
              <div>背景颜色设置</div>
              <ColorPicker
                defaultColor={defaultSetting.backgroundColor}
                initialColor={bgColor}
                onSave={onBgColorSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
