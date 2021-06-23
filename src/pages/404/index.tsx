import dynamic from 'next/dynamic'
import React from 'react'
import { ROUTES } from 'routes'
const MenuWrappedRoute = dynamic(() => import('../../components/Menu'), { ssr: false })
//@ts-ignore
const NotFound = dynamic(() => import('alium-uikit/src').then((module) => module.NotFound), { ssr: false })

const ErrorPage = () => {
  // @ts-ignore
  const is = process.browser
  return (
    <>
      {is && (
        <MenuWrappedRoute loginBlockVisible>
          <NotFound redirectURL={ROUTES.home} />
        </MenuWrappedRoute>
      )}
    </>
  )
}

export default ErrorPage
