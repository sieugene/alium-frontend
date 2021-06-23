import dynamic from 'next/dynamic'
import React from 'react'

const Providers = dynamic(() => import('Providers'), { ssr: false })

const Popups = dynamic(() => import('components/Popups'), { ssr: false })

const App = dynamic(() => import('App'), { ssr: false })

function HomePage() {
  // @ts-ignore
  const isBrowser = process.browser
  return (
    <>
      {isBrowser && (
        <Providers>
          <Popups />
          <App />
        </Providers>
      )}
    </>
  )
}

export default HomePage
