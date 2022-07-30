import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import tw from "./locales/zh-tw.json";

const resources = {
  en: { translation: en },
  tw: { translation: tw },
};

let localStorageGetLanguage = localStorage.getItem("i18nextLng") || "tw";

i18n
  .use(initReactI18next)
  // 實例化 initReactI18next
  .use(LanguageDetector)
  // 將 i18next 傳入 react-i18next 裡面
  .init({
    resources,
    lng: localStorageGetLanguage,
    // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng作為預設語言
    fallbackLng: "tw",
    detection: {
      caches: ["localStorage"],
    },
    interpolation: {
      // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
      escapeValue: false,
    },
  });

export default i18n;
