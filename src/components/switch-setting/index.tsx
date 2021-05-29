import React, { useEffect, useState } from 'react';
import cns from 'classnames';
import { getClearColor } from '@/utils/color';
import styles from './index.module.scss';

interface SwitchSettingProps {
  bgColor?: string;
  open: boolean;
  changeOpen: () => any;
}

const SwitchSetting: React.FC<SwitchSettingProps> = ({ open, changeOpen, bgColor = 'rgb(240,240,240)' }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [color, setColor] = useState<string>(getClearColor(bgColor));

  const onHover = () => setHover(true);
  const onUnHover = () => setHover(false);

  useEffect(() => {
    setColor(getClearColor(bgColor));
  }, [bgColor]);

  return (
    <div className={cns(styles.settingIcon, { [styles.rotate]: open })} onClick={changeOpen}>
      <svg
        className={styles.icon}
        style={{ fill: open || hover ? getClearColor(color, 24) : color }}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}
        viewBox='0 0 1024 1024'
      >
        <path d='M812.6976 195.976533L936.021333 409.6a204.8 204.8 0 0 1 0 204.8L812.714667 828.023467a204.8 204.8 0 0 1-177.373867 102.4H388.676267a204.8 204.8 0 0 1-177.373867-102.4L87.978667 614.4a204.8 204.8 0 0 1 0-204.8l123.323733-213.623467a204.8 204.8 0 0 1 177.373867-102.4h246.647466a204.8 204.8 0 0 1 177.373867 102.4z m-59.118933 34.133334a136.533333 136.533333 0 0 0-118.254934-68.266667H388.676267a136.533333 136.533333 0 0 0-118.254934 68.266667L147.114667 443.733333a136.533333 136.533333 0 0 0 0 136.533334l123.323733 213.623466a136.533333 136.533333 0 0 0 118.254933 68.266667h246.647467a136.533333 136.533333 0 0 0 118.254933-68.266667L876.885333 580.266667a136.533333 136.533333 0 0 0 0-136.533334l-123.323733-213.623466z'></path>
        <path d='M512 682.666667c94.2592 0 170.666667-76.407467 170.666667-170.666667s-76.407467-170.666667-170.666667-170.666667-170.666667 76.407467-170.666667 170.666667 76.407467 170.666667 170.666667 170.666667z m0-68.266667a102.4 102.4 0 1 1 0-204.8 102.4 102.4 0 0 1 0 204.8z'></path>
      </svg>
    </div>
  );
};

export default SwitchSetting;
