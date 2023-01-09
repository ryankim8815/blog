// import { DefaultTheme } from "styled-components";
import { DefaultTheme } from "styled-components";

const size = {
  mobile: "770px",
  tabletS: "1023px",
  tabletM: "1220px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px",
};

const theme = {
  // mainColor
  mainColor: "#835DFE",
  mainLightColor: "#F1EDFC", // 페이지bg
  mainMoreLightColor: "#FAF9FF", // 컨포넌트 밝은 보라 bg
  mainDarkColor: "#403E56", // footer, 어두운버튼

  // black
  blackTextColor: "#333;", // 검정폰트

  // grey
  greyTextColor: "#999", // 회색폰트
  greyBorderColor: "#e1e1e1", // 회색보더
  greyBtnBgColor: "#F6F6F7", // 회색버튼배경

  // the rest
  warningColor: "#E57683", // input경고

  // size
  mobileSize: `${size.mobile}`,
  tabletSize: `${size.tabletL}`,
  laptopSize: `${size.laptop}`,
  desktopSize: `${size.desktop}`,
  // media size
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

const colors = {
  // mainColor
  main: "#835DFE",
  mainLight: "#F1EDFC", // 페이지bg
  mainMoreLight: "#FAF9FF", // 컨포넌트 밝은 보라 bg
  mainDark: "#403E56", // footer, 어두운버튼

  // grey
  greyText: "#999", // 회색폰트
  greyBorder: "#e1e1e1", // 회색보더
  greyBtnBg: "#F6F6F7", // 회색버튼배경

  // the rest
  warning: "#E57683", // input경고
};

const fontSize = {
  title: "32px", // 메인타이틀
  subTitle: "24px", // 박스안의 제목들
  text: "15px",
};

const common = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  inner: `
    max-width: 1180px;
    margin: 0 auto;
  `,

  contentMinLayout: `
    min-height: calc(100vh - 64px - 172px);
    margin-top: 64px;
  `,
};

// export type ColorsTypes = typeof colors;
// export type FontSizeTypes = typeof fontSize;
// export type CommonTypes = typeof common;

// const theme: DefaultTheme = {
//   colors,
//   fontSize,
//   common,
// };

// export default theme;
export default theme;
