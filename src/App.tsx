// import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getMainDomain,Maintenance,NotFound,ResetCSS } from '@alium-official/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import React,{ lazy,Suspense,useEffect } from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import MenuWrappedRoute from './components/Menu'
import PageLoader from './components/PageLoader'
import ToastListener from './components/ToastListener'
// import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import AuditPage from './views/Audit'
import Pools from './views/Pools'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const InvestorsAccountContainer = lazy(() => import('pages/InvestorsAccount/InvestorsAccountContainer'))
const SwapContainter = lazy(() => import('pages/Swap/SwapContainter'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released

  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  // useFetchPublicData()
  // useFetchProfile()

  const loginBlockVisible = true
  const loginBlockHidden = false

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <ResetCSS />
        <GlobalStyle />
        <Switch>
          <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <InvestorsAccountContainer />
            <SwapContainter />
            <Route path="/" exact>
              <Home />
            </Route>
          </MenuWrappedRoute>
          <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <Route path="/farms">
              <Farms />
            </Route>
          </MenuWrappedRoute>
          <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <Route path="/pools">
              <Pools />
            </Route>
          </MenuWrappedRoute>
          <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <Route path="/audits">
              <AuditPage />
            </Route>
          </MenuWrappedRoute>

          {/* <Route path="/lottery">
              <Lottery />
            </Route> */}
          {/* <Route path="/ifo">
              <Ifos />
            </Route> */}
          {/* <Route path="/nft">
              <Nft />
            </Route> */}
          {/* <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route> */}
          {/* <Route path="/profile">
              <Profile />
            </Route> */}
          {/* Redirect */}
          {/* <Route path="/staking">
              <Redirect to="/pools" />
            </Route> */}
          {/* <Route path="/syrup">
              <Redirect to="/pools" />
            </Route> */}
          {/* 404 */}
          <Route path="/maintenance">
            <Maintenance />
          </Route>
          <MenuWrappedRoute loginBlockVisible={loginBlockHidden}>
            <NotFound redirectURL={`https://${getMainDomain()}`} />
          </MenuWrappedRoute>
        </Switch>
        <ToastListener />
      </Suspense>
    </Router>
  )
}

export default React.memo(App)
