import BigNumber from 'bignumber.js'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import React from 'react'
import TagManager from 'react-gtm-module'
import 'typeface-roboto'

const Providers = dynamic(() => import('Providers'), { ssr: false })
const Popups = dynamic(() => import('components/Popups'), { ssr: false })
const ToastListener = dynamic(() => import('components/ToastListener'), { ssr: false })

// import '../i18n'

const tagManagerArgs = {
  gtmId: 'GTM-MWZ3WL5',
}

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])
  React.useEffect(() => {
    console.warn = () => null
  }, [])

  // useEagerConnect()

  return (
    <>
      <Providers>
        <Popups />
        <Component {...pageProps} /> <ToastListener />
      </Providers>
    </>
  )
}
export default MyApp
