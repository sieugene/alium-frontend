import React,{ Suspense } from 'react'
// no have idea with hot change providers
const Provider = React.lazy(() => {
  // const location = window?.location?.pathname
  // if (location === '/profile') {
  //   return import('providers/InvestorsProvider')
  // } else {
  //   return import('providers/MainProvider')
  // }
  return import('providers/InvestorsProvider')
})

const Providers: React.FC = ({ children }) => {
  return (
    <Suspense fallback={<div></div>}>
      <Provider>{children}</Provider>
    </Suspense>
  )
}

export default Providers
