import { StringTranslations } from '@crowdin/crowdin-api-client'
import { allLanguages, EN } from 'config/localisation/languageCodes'
import { TranslationsContext } from 'contexts/Localisation/translationsContext'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

const CACHE_KEY = 'pancakeSwapLanguage'

export interface LangType {
  code: string
  language: string
}

export interface LanguageState {
  selectedLanguage: LangType
  setSelectedLanguage: (langObject: LangType) => void
  translatedLanguage: LangType
  setTranslatedLanguage: Dispatch<SetStateAction<LangType>>
}

const LanguageContext = createContext({
  selectedLanguage: EN,
  setSelectedLanguage: () => undefined,
  translatedLanguage: EN,
  setTranslatedLanguage: () => undefined,
} as LanguageState)

const fileId = 8
const projectId = parseInt(process.env.REACT_APP_CROWDIN_PROJECTID, 10)
const stringTranslationsApi = new StringTranslations({
  token: process.env.REACT_APP_CROWDIN_APIKEY,
})

const fetchTranslationsForSelectedLanguage = (selectedLanguage) => {
  return stringTranslationsApi.listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
}

const LanguageContextProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(EN)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(EN)
  const [translations, setTranslations] = useState<Array<any>>([])

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage(selectedLanguage)
        .then((translationApiResponse) => {
          if (translationApiResponse.data.length < 1) {
            setTranslations([])
          } else {
            setTranslations(translationApiResponse.data)
          }
        })
        .then(() => setTranslatedLanguage(selectedLanguage))
        .catch((e) => {
          setTranslations([])
          console.error('Error while loading translations', e)
        })
    }
  }, [selectedLanguage, setTranslations])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage: handleLanguageSelect, translatedLanguage, setTranslatedLanguage }}
    >
      <TranslationsContext.Provider value={{ translations, setTranslations }}>{children}</TranslationsContext.Provider>
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageContextProvider }
