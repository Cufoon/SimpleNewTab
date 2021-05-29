const rgbaReg =
  /^rgba?\(\s*(?<r>\d+(\.\d+)?)\s*,\s*(?<g>\d+(\.\d+)?)\s*,\s*(?<b>\d+(\.\d+)?)\s*(,\s*(?<o>\d+(\.\d+)?)\s*)?\)$/i;

export const checkColor = (value: string): boolean => rgbaReg.test(value);

interface ColorGroup {
  [key: string]: string;
  r: string;
  g: string;
  b: string;
  o: string;
}

export const getClearColor = (bgColor: string, offset: number = 0): string => {
  const cg = (bgColor.match(rgbaReg)?.groups || { r: '240', g: '240', b: '240', o: '1' }) as ColorGroup;
  const r = parseFloat(cg.r);
  const g = parseFloat(cg.g);
  const b = parseFloat(cg.b);
  let bright = r * 0.3 + g * 0.59 + b * 0.11;
  console.log(bright);
  bright += bright < 127.5 ? 50 + offset : -18 - offset;
  return `rgba(${bright},${bright},${bright})`;
};
