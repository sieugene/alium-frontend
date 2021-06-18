import backgroundImage from 'assets/svg/trade-background.svg'
import AddLiquidity from 'pages/AddLiquidity'
import {
RedirectDuplicateTokenIds,
RedirectOldAddLiquidityPathStructure,
RedirectToAddLiquidity
} from 'pages/AddLiquidity/redirects'
import Pool from 'pages/Pool'
import PoolFinder from 'pages/PoolFinder'
import { RemoveLiquidity } from 'pages/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from 'pages/RemoveLiquidity/redirects'
import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import Swap from '.'
import { RedirectPathToSwapOnly,RedirectToSwap } from './redirects'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 20%;
  padding: 32px 24px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;

  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: top right;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: top right;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 18.6% 32px 18.6%;
  }

  @media screen and (max-width: 768px) {
    padding: 38px 24px;
  }
  @media screen and (max-width: 500px) {
    padding: 32px 11px;
  }
`

const WrapSwapComponent = ({ children }) => {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <AppWrapper>
        <BodyWrapper>{children}</BodyWrapper>
      </AppWrapper>
    </>
  )
}

export default function SwapContainter() {
  return (
    <>
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
        path="/add"
        render={() => (
          <WrapSwapComponent>
            <AddLiquidity />
          </WrapSwapComponent>
        )}
      />
      <Route
        exact
        path="/add/:currencyIdA"
        render={() => (
          <WrapSwapComponent>
            <RedirectOldAddLiquidityPathStructure />
          </WrapSwapComponent>
        )}
      />
      <Route
        exact
        path="/add/:currencyIdA/:currencyIdB"
        render={() => (
          <WrapSwapComponent>
            <RedirectDuplicateTokenIds />
          </WrapSwapComponent>
        )}
      />
      <Route
        exact
        strict
        path="/remove/:tokens"
        render={() => (
          <WrapSwapComponent>
            <RedirectOldRemoveLiquidityPathStructure />
          </WrapSwapComponent>
        )}
      />
      <Route
        exact
        strict
        path="/remove/:currencyIdA/:currencyIdB"
        render={() => (
          <WrapSwapComponent>
            <RemoveLiquidity />
          </WrapSwapComponent>
        )}
      />
    </>
  )
}
