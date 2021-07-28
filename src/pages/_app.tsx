import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import BigNumber from 'bignumber.js'
import Loaders from 'components/Loaders'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { InitStores } from 'store/InitStores'
import 'typeface-roboto'
import GTM from 'utils/gtm'
import nextI18NextConfig from '../../next-i18next.config.js'

const Providers = dynamic(() => import('Providers'), { ssr: false })
const Popups = dynamic(() => import('components/Popups'), { ssr: false })
const ToastListener = dynamic(() => import('components/ToastListener'), { ssr: false })
const GlobalStyle = dynamic(() => import('style/Global'), { ssr: false })
const ResetCSS = dynamic(() => import('alium-uikit/src').then((module) => module.ResetCSS), { ssr: false })
const MenuWrappedRoute = dynamic(() => import('../components/Menu'), { ssr: false })
const EagerConnectContainer = dynamic(() => import('connectors/EagerConnectContainer'), { ssr: false })

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Alium Swap</title>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1' />
    </Head>
    <InitStores />
    <GTMProvider state={GTM.params}>
      <Providers>
        <EagerConnectContainer />
        <Popups />
        <Loaders />
        <ResetCSS />
        <GlobalStyle />
        <MenuWrappedRoute loginBlockVisible>
          <Component {...pageProps} />
        </MenuWrappedRoute>
        <ToastListener />
      </Providers>
    </GTMProvider>
  </>
)

export default appWithTranslation(MyApp, nextI18NextConfig)
