import { useBridgeContext } from 'contexts/BridgeContext'
import { BigNumber, utils } from 'ethers'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useEffect, useState } from 'react'
import { logError } from 'utils/bridge/helpers'
import { fetchTokenBalance } from 'utils/bridge/token'
import BridgeNetwork from '../BridgeNetwork'

export const ToToken = React.memo(() => {
  const { providerChainId, account, connected } = useWeb3Context()
  const { getBridgeChainId, bridgeDirection } = useBridgeDirection()
  const {
    txHash,
    toToken: token,
    toAmount: amount,
    toAmountLoading: loading,
    setToBalance: setBalance,
  } = useBridgeContext()
  const chainId = getBridgeChainId(providerChainId)
  const [balanceLoading, setBalanceLoading] = useState(false)

  useEffect(() => {
    if (token && account && chainId === token.chainId && connected) {
      setBalanceLoading(true)
      setBalance(BigNumber.from(0))

      fetchTokenBalance(token, account)
        .then((b) => {
          setBalance(b)
          setBalanceLoading(false)
        })
        .catch((toBalanceError) => {
          logError({ toBalanceError })

          setBalance(BigNumber.from(0))
          setBalanceLoading(false)
        })
    } else {
      setBalance(BigNumber.from(0))
    }
  }, [txHash, token, account, setBalance, setBalanceLoading, chainId, bridgeDirection, connected])

  return (
    <div>
      <BridgeNetwork
        type='toNetwork'
        value={token ? utils.formatUnits(amount, token?.decimals) : '0'}
        token={token}
        balanceLoading={balanceLoading || loading}
      />
    </div>
  )
})
