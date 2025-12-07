import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "./en.json";
import id from "./id.json";

const translations = { en, id };

type Language = "en" | "id";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

interface ProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: ProviderProps) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);