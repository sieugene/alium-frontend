// import { useWallet } from '@binance-chain/bsc-use-wallet'
import { NotFound,ResetCSS } from '@alium-official/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import AddLiquidity from 'pages/AddLiquidity'
import {
RedirectDuplicateTokenIds,
RedirectOldAddLiquidityPathStructure,
RedirectToAddLiquidity
} from 'pages/AddLiquidity/redirects'
import InvestorsAccount from 'pages/InvestorsAccount'
import Collection from 'pages/InvestorsAccount/Collection'
import { WrapInvestorsAccounComponent } from 'pages/InvestorsAccount/InvestorsAccountContainer'
import Pool from 'pages/Pool'
import PoolFinder from 'pages/PoolFinder'
import { RemoveLiquidity } from 'pages/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from 'pages/RemoveLiquidity/redirects'
import Swap from 'pages/Swap'
import { RedirectPathToSwapOnly,RedirectToSwap } from 'pages/Swap/redirects'
import { WrapSwapComponent } from 'pages/Swap/SwapContainter'
import React,{ lazy,Suspense,useEffect } from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import { ROUTES } from 'routes'
import MenuWrappedRoute from './components/Menu'
import PageLoader from './components/PageLoader'
import ToastListener from './components/ToastListener'
// import { useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const AuditPage = lazy(() => import('views/Audit'))
const Farms = lazy(() => import('./views/Farms'))

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
        <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* Investors account routes */}
            <Route
              exact
              strict
              path={ROUTES.tokenHolderArea}
              render={() => (
                <WrapInvestorsAccounComponent>
                  <InvestorsAccount />
                </WrapInvestorsAccounComponent>
              )}
            />
            <Route
              exact
              strict
              path={ROUTES.collection}
              render={() => (
                <WrapInvestorsAccounComponent>
                  <Collection />
                </WrapInvestorsAccounComponent>
              )}
            />
            {/* Swap routes */}
            <Route
              exact
              strict
              path="/swap"
              render={() => (
                <WrapSwapComponent>
                  <Swap />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path="/swap/:outputCurrency"
              render={() => (
                <WrapSwapComponent>
                  <RedirectToSwap />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path="/send"
              render={() => (
                <WrapSwapComponent>
                  <RedirectPathToSwapOnly />
                </WrapSwapComponent>
              )}
            />
            {/* <Route exact strict path="/migrate" component={Migrate} /> */}
            <Route
              exact
              strict
              path="/find"
              render={() => (
                <WrapSwapComponent>
                  <PoolFinder />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path="/pool"
              render={() => (
                <WrapSwapComponent>
                  <Pool />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path="/create"
              render={() => (
                <WrapSwapComponent>
                  <RedirectToAddLiquidity />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              path={ROUTES.add}
              render={() => (
                <WrapSwapComponent>
                  <AddLiquidity />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              path={ROUTES.addWithCurrencyA}
              render={() => (
                <WrapSwapComponent>
                  <RedirectOldAddLiquidityPathStructure />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              path={ROUTES.addWithMultipleCurrency}
              render={() => (
                <WrapSwapComponent>
                  <RedirectDuplicateTokenIds />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path={ROUTES.removeTokens}
              render={() => (
                <WrapSwapComponent>
                  <RedirectOldRemoveLiquidityPathStructure />
                </WrapSwapComponent>
              )}
            />
            <Route
              exact
              strict
              path={ROUTES.removeMultiple}
              render={() => (
                <WrapSwapComponent>
                  <RemoveLiquidity />
                </WrapSwapComponent>
              )}
            />
            <Route exact strict path="/audits">
              <AuditPage />
            </Route>
            {/* Default route */}
            <Route
              render={() => {
                return <NotFound redirectURL={ROUTES.home} />
              }}
            />

            {/* <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <Route path="/farms">
              <Farms />
            </Route>
          </MenuWrappedRoute>
          <MenuWrappedRoute loginBlockVisible={loginBlockVisible}>
            <Route path="/pools">
              <Pools />
            </Route>
          </MenuWrappedRoute> */}

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
            {/* <Route path="/maintenance">
            <Maintenance />
          </Route> */}
          </Switch>
        </MenuWrappedRoute>
        <ToastListener />
      </Suspense>
    </Router>
  )
}

export default React.memo(App)
