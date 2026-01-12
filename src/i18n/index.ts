import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import zh from "../locales/zh.json";

const isBrowser = typeof window !== "undefined";
const storedLang = isBrowser ? localStorage.getItem("lang") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: storedLang || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

if (isBrowser) {
  i18n.on("languageChanged", (lang) => {
    localStorage.setItem("lang", lang);
  });
}

export default i18n;
