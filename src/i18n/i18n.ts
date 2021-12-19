import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import en from './en.json';
import vi from './vi.json';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
});

export default i18n;
