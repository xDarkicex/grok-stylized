import font400 from './fonts/400.base64';
import font500 from './fonts/500.base64';
import font700 from './fonts/700.base64';

export function getFontCSS() {
  return `
    @font-face {
      font-family: 'Inter';
      font-weight: 400;
      src: url(data:font/woff2;charset=utf-8;base64,${font400}) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-weight: 500;
      src: url(data:font/woff2;charset=utf-8;base64,${font500}) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-weight: 700;
      src: url(data:font/woff2;charset=utf-8;base64,${font700}) format('woff2');
    }
  `;
}