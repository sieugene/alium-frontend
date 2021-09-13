import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from 'alium-uikit/src'
// import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { IntercomProvider } from 'react-use-intercom'
import { ThemeContextProvider } from 'ThemeContext'
import GTM from 'utils/gtm'
import store from '../state'
import getLibrary from '../utils/getLibrary'

const Web3ReactProviderDefault = dynamic(() => import('./Web3ReactProviderDefault'), { ssr: false })

// this modified version provider, merged with main provider

const InvestorsProvider: FC = ({ children }) => {
  const sendDataToGTM = useGTMDispatch()
  return (
    <IntercomProvider
      appId={process.env.APP_INTERCOM_APP_ID}
      autoBoot
      shouldInitialize={!!process.env.APP_INTERCOM_APP_ID}
      onShow={() => {
        GTM.clickIntercom(sendDataToGTM)
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ReactProviderDefault getLibrary={getLibrary}>
          <Provider store={store}>
            <ThemeContextProvider>
              {/* <LanguageContextProvider> */}
              <ModalProvider>{children}</ModalProvider>
              {/* </LanguageContextProvider> */}
            </ThemeContextProvider>
          </Provider>
        </Web3ReactProviderDefault>
      </Web3ReactProvider>
    </IntercomProvider>
  )
}
export default InvestorsProvider
