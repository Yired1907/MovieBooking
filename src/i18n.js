import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HOME_EN from "./locales/en/translation.json";
import HOME_VI from "./locales/vi/translation.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      // en: {
      //   home: HOME_EN,
      // },
      vi: {
        home: HOME_VI,
      },
    },
    lng: "vi", // if you're using a language detector, do not define the lng option
    fallbackLng: "",
    ns: ["home"],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
