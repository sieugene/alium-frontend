import { useBridgeContext } from 'contexts/BridgeContext'
import { utils } from 'ethers'
import React, { useCallback, useRef } from 'react'
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
  const { fromToken: token, balancesLoading, fromAmount: amount } = useBridgeContext()

  return (
    <div>
      <BridgeNetwork
        type='fromNetwork'
        value={token ? utils.formatUnits(amount, token?.decimals) : '0'}
        token={token}
        balanceLoading={balancesLoading}
      />
    </div>
  )
})
