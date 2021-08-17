import { BigNumber } from 'ethers'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useCallback, useEffect } from 'react'
import { fetchTokenBalance } from 'utils/bridge/token'
import { useBridgeContext } from './../../../contexts/BridgeContext'
import { useBridgeDirection } from './../../../hooks/bridge/useBridgeDirection'
import { logError } from './../../../utils/bridge/helpers'
export const useBridgeBalances = () => {
  const { account, connected, providerChainId } = useWeb3Context()
  const { getBridgeChainId, bridgeDirection } = useBridgeDirection()
  const chainId = getBridgeChainId(providerChainId)

  const {
    toToken,
    setToBalance,
    fromToken,
    setFromBalance,
    balancesLoading,
    setBalancesLoading,
    closeBalanceTask,
    setCloseBalanceTask,
  } = useBridgeContext()

  const allowFetchFrom = React.useMemo(
    () => fromToken && account && providerChainId === fromToken.chainId,
    [account, fromToken, providerChainId],
  )

  const allowFetchTo = React.useMemo(
    () => toToken && account && chainId === toToken.chainId,
    [account, chainId, toToken],
  )

  const allowFetch = React.useMemo(
    () => allowFetchFrom && allowFetchTo && bridgeDirection && !balancesLoading && connected && !closeBalanceTask,
    [allowFetchFrom, allowFetchTo, balancesLoading, bridgeDirection, connected, closeBalanceTask],
  )

  const clearBalances = useCallback(() => {
    setToBalance(BigNumber.from(0))
    setFromBalance(BigNumber.from(0))
  }, [setFromBalance, setToBalance])

  const fetchBalances = useCallback(() => {
    setBalancesLoading(true)
    clearBalances()
    Promise.all([fetchTokenBalance(toToken, account), fetchTokenBalance(fromToken, account)])
      .then(([toBalance, fromBalance]) => {
        setToBalance(toBalance)
        setFromBalance(fromBalance)
        setBalancesLoading(false)
      })
      .catch((balanceError) => {
        logError(balanceError)
        clearBalances()
        setBalancesLoading(false)
      })
      .finally(() => {
        setCloseBalanceTask(true)
      })
  }, [
    account,
    clearBalances,
    fromToken,
    setBalancesLoading,
    setCloseBalanceTask,
    setFromBalance,
    setToBalance,
    toToken,
  ])

  useEffect(() => {
    if (allowFetch) {
      fetchBalances()
    }
  }, [allowFetch, fetchBalances])
}

export const useRefetchBridgeBalances = () => {
  const { setCloseBalanceTask } = useBridgeContext()

  return () => {
    setCloseBalanceTask(false)
  }
}
