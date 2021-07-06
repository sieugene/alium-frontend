import { useRouter } from 'next/router'
import React from 'react'

// Redirects to swap but only replace the pathname
export const RedirectPathToSwapOnly = () => {
  const location = useRouter()
  React.useEffect(() => {
    location.push('/swap')
  }, [])
  return <div />
}

// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export const RedirectToSwap = () => {
  const location = useRouter()
  const search = location.query?.search
  const outputCurrency = location.query?.outputCurrency
  React.useEffect(() => {
    const path =
      search && search.length > 1 ? `${search}&outputCurrency=${outputCurrency}` : `?outputCurrency=${outputCurrency}`
    location.push(`/swap/${path}`)
  }, [])

  return <div />
}
