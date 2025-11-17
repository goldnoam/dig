import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from 'react';
import * as translations from '../localization';

type LanguageCode = keyof typeof translations;

const availableLanguages: { [key in LanguageCode]: string } = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  he: 'עברית',
  hi: 'हिन्दी',
  ru: 'Русский',
  zh: '中文',
  ar: 'العربية'
};

const languageMap: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    he: 'Hebrew',
    hi: 'Hindi',
    ru: 'Russian',
    zh: 'Chinese',
    ar: 'Arabic'
};

interface LocalizationContextType {
  lang: LanguageCode;
  setLang: (lang: string) => void;
  t: typeof translations.en;
  availableLanguages: typeof availableLanguages;
  languageMap: typeof languageMap;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'en';
    const savedLang = localStorage.getItem('dig-it-lang') as LanguageCode;
    if (savedLang && availableLanguages[savedLang]) {
      return savedLang;
    }
    const browserLang = navigator.language.split('-')[0] as LanguageCode;
    return availableLanguages[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('dig-it-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'he' || lang === 'ar') ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: string) => {
    if (availableLanguages[newLang as LanguageCode]) {
      setLangState(newLang as LanguageCode);
    }
  };

  const t = useMemo(() => {
    return translations[lang] || translations.en;
  }, [lang]);

  return (
    <LocalizationContext.Provider value={{ lang, setLang, t, availableLanguages, languageMap }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
