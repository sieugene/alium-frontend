import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import Loaders from 'components/Loaders'
import MetaHeader from 'components/MetaHeader'
import 'config'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
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
