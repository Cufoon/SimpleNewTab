const rgbaReg =
  /^rgba?\(\s*(?<r>\d+(\.\d+)?)\s*,\s*(?<g>\d+(\.\d+)?)\s*,\s*(?<b>\d+(\.\d+)?)\s*(,\s*(?<a>\d+(\.\d+)?)\s*)?\)$/i;

export const checkIsColorRGBA = (value: string): boolean => rgbaReg.test(value);

interface ColorGroup {
  [key: string]: string;
  r: string;
  g: string;
  b: string;
  a: string;
}

export const hex2RGBA = (hexColor: string) => {
  const hex = `0x${hexColor.substring(1)}`;
  const hn = parseInt(hex);
  if (hex.length === 10) {
    return `rgba(${(hn >> 24) & 255},${(hn >> 16) & 255},${(hn >> 8) & 255},${(hn & 255) / 255})`;
  }
  if (hex.length === 8) {
    return `rgba(${(hn >> 16) & 255},${(hn >> 8) & 255},${hn & 255},1)`;
  }
  if (hex.length === 6) {
    const r = (hn >> 12) & 15;
    const g = (hn >> 8) & 15;
    const b = (hn >> 4) & 15;
    const a = hn & 15;
    return `rgba(${(r << 4) + r},${(g << 4) + g},${(b << 4) + b},${((a << 4) + a) / 255})`;
  }
  if (hex.length === 5) {
    const r = (hn >> 8) & 15;
    const g = (hn >> 4) & 15;
    const b = hn & 15;
    return `rgba(${(r << 4) + r},${(g << 4) + g},${(b << 4) + b},1)`;
  }
};

export const getClearColorFromRGBA = (bgColor: string, offset = 0): string => {
  const cg = (bgColor.match(rgbaReg)?.groups || {
    r: '240',
    g: '240',
    b: '240',
    a: '1'
  }) as ColorGroup;
  const r = parseFloat(cg.r);
  const g = parseFloat(cg.g);
  const b = parseFloat(cg.b);
  let bright = r * 0.3 + g * 0.59 + b * 0.11;
  // console.log(bright);
  bright += bright < 127.5 ? 50 + offset : -18 - offset;
  return `rgba(${bright},${bright},${bright},1)`;
};
