import { createContext, Dispatch, SetStateAction } from 'react'

export interface TranslationState {
  translations: Array<any>
  setTranslations: Dispatch<SetStateAction<Array<any>>>
}

const defaultTranslationState: TranslationState = {
  translations: [],
  setTranslations: (): void => undefined,
}

export const TranslationsContext = createContext(defaultTranslationState as TranslationState)
