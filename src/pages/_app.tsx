import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import { ResetCSS } from 'alium-uikit/src'
import Loaders from 'components/Loaders'
import MetaHeader from 'components/MetaHeader'
import ToastListener from 'components/ToastListener'
import 'config/bignumber'
import EagerConnectContainer from 'connectors/EagerConnectContainer'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { InitStores } from 'store/InitStores'
import GlobalStyle from 'style/Global'
import 'typeface-roboto'
import GTM from 'utils/gtm'
import nextI18NextConfig from '../../next-i18next.config.js'
import MenuWrappedRoute from '../components/Menu'
const Providers = dynamic(() => import('Providers'), { ssr: false })

const Popups = dynamic(() => import('components/Popups'), { ssr: false })

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MetaHeader />
      <InitStores />
      <GTMProvider state={GTM.params}>
        <Providers>
          <EagerConnectContainer />
          <Popups />

          <ResetCSS />
          <GlobalStyle />
          <MenuWrappedRoute loginBlockVisible>
            <Loaders />
            <Component {...pageProps} />
          </MenuWrappedRoute>
          <ToastListener />
        </Providers>
      </GTMProvider>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
