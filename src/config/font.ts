import localFont from "next/font/local";

const IranSans = localFont({
  src: [
    {
      path: "../app/fonts/IRANSansWebFaNum_UltraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../app/fonts/IRANSansWebFaNum_Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/IRANSansWebFaNum.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/IRANSansWebFaNum_Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/IRANSansWebFaNum_Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/IRANSansWebFaNum_Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iranSans",
  display: "swap",
});

export default IranSans;
