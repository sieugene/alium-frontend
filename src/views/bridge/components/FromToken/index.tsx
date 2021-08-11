import { useBridgeContext } from 'contexts/BridgeContext'
import { BigNumber, utils } from 'ethers'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { logError } from 'utils/bridge/helpers'
import { fetchTokenBalance } from 'utils/bridge/token'
import BridgeNetwork from '../BridgeNetwork'

export const useDelay = (fn, ms) => {
  const timer = useRef(null)

  const delayCallBack = useCallback(
    (...args) => {
      clearTimeout(timer.current)
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      timer.current = setTimeout(fn.bind(this, ...args), ms || 0)
    },
    [fn, ms],
  )

  return delayCallBack
}

export const FromToken = React.memo(() => {
  const { fromToken: token, setFromBalance: setBalance, fromAmount: amount } = useBridgeContext()
  const { providerChainId: chainId, account, connected } = useWeb3Context()

  const [balanceLoading, setBalanceLoading] = useState(false)

  useEffect(() => {
    if (token && account && chainId === token.chainId && !balanceLoading && connected) {
      setBalanceLoading(true)
      setBalance(BigNumber.from(0))
      fetchTokenBalance(token, account)
        .then((b) => {
          setBalance(b)
          setBalanceLoading(false)
        })
        .catch((fromBalanceError) => {
          logError({ fromBalanceError })
          setBalance(BigNumber.from(0))
          setBalanceLoading(false)
        })
    }
  }, [token, account, chainId, connected])

  return (
    <div>
      <BridgeNetwork
        type='fromNetwork'
        value={token ? utils.formatUnits(amount, token?.decimals) : '0'}
        token={token}
        balanceLoading={balanceLoading}
      />
    </div>
  )
})
