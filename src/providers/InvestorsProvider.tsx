import { ModalProvider } from '@alium-official/uikit'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import React from 'react'
import { Provider } from 'react-redux'
import { IntercomProvider } from 'react-use-intercom'
import { NetworkContextName } from '../constants'
import store from '../state'
import { ThemeContextProvider } from '../ThemeContext'
import getLibrary from '../utils/getLibrary'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
// this modified version provider, merged with main provider
const InvestorsProvider: React.FC = ({ children }) => {
  return (
    <IntercomProvider
      appId={process.env.REACT_APP_INTERCOM_APP_ID}
      autoBoot
      shouldInitialize={!!process.env.REACT_APP_INTERCOM_APP_ID}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>
            <ThemeContextProvider>
              <LanguageContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </LanguageContextProvider>
            </ThemeContextProvider>
          </Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </IntercomProvider>
  )
}
export default InvestorsProvider
