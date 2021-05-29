import React, { useRef, useEffect, useState } from 'react';
import '@simonwep/pickr/dist/themes/classic.min.css';
import Pickr from '@simonwep/pickr';
import styles from './index.module.scss';

let globalKeyId = 0;
const getGlobalKey = () => {
  return `color-picker-key-${globalKeyId++}`;
};

interface ColorPickerProps {
  onSave: (value: string) => any;
  initialColor: string;
  defaultColor: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onSave, defaultColor, initialColor }) => {
  const keyIdRef = useRef<string>(getGlobalKey());
  const [color, setColor] = useState<string>(initialColor);
  const pickerRef = useRef<Pickr>();

  useEffect(() => {
    pickerRef.current?.setColor(initialColor);
  }, [initialColor]);

  useEffect(() => {
    pickerRef.current = Pickr.create({
      el: `#${keyIdRef.current}`,
      theme: 'classic',
      container: '#app',
      default: initialColor,
      appClass: styles.colorPicker,
      showAlways: false,
      useAsButton: true,
      swatches: ['rgba(252, 252, 252, 1)', 'rgba(244, 244, 244, 1)', 'rgba(212, 212, 212, 1)'],
      position: 'top-end',
      adjustableNumbers: true,
      autoReposition: true,
      defaultRepresentation: 'RGBA',
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          cancel: true,
          clear: true,
          save: true
        }
      },
      i18n: {
        'ui:dialog': '选择背景颜色',
        'btn:swatch': '历史颜色',
        'btn:last-color': '使用之前的颜色',
        'btn:save': '保存',
        'btn:cancel': '取消',
        'btn:clear': '恢复默认',
        'aria:btn:save': '保存',
        'aria:btn:cancel': '取消',
        'aria:btn:clear': '恢复默认',
        'aria:input': '颜色输入框',
        'aria:palette': '颜色选择面板',
        'aria:hue': '色相滑动选择条',
        'aria:opacity': '透明度滑动选择条'
      }
    });

    pickerRef.current
      .on('save', (hsva: Pickr.HSVaColor, instance: Pickr) => {
        const newColor = hsva?.toRGBA().toString() || defaultColor;
        setColor(newColor);
        onSave(newColor);
        instance?.hide();
      })
      .on('cancel', (instance: Pickr) => {
        instance?.hide();
      });
  }, []);
  return <div id={keyIdRef.current} className={styles.colorBtn} style={{ backgroundColor: color }}></div>;
};

export default ColorPicker;
