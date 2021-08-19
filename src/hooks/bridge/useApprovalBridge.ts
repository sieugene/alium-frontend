import { LARGEST_UINT256, LOCAL_STORAGE_KEYS } from 'constants/bridge/bridge.constants'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import { logError } from 'utils/bridge/helpers'
import { approveToken, fetchAllowance } from 'utils/bridge/token'
import { useWeb3Context } from './useWeb3Context'

const { INFINITE_UNLOCK } = LOCAL_STORAGE_KEYS

export const useApproval = (fromToken: BridgeToken, fromAmount: BigNumber, txHash: string) => {
  const { account, ethersProvider, providerChainId, connected } = useWeb3Context()
  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    if (fromToken && providerChainId === fromToken.chainId && ethersProvider && connected) {
      fetchAllowance(fromToken, account, ethersProvider)
        .then((amountAllowance) => {
          setAllowance(amountAllowance)
        })
        .catch((error) => {
          setAllowance(BigNumber.from(0))
        })
    } else {
      setAllowance(BigNumber.from(0))
    }
  }, [account, connected, ethersProvider, fromToken, providerChainId])

  useEffect(() => {
    setAllowed((fromToken && ['NATIVE', 'erc677'].includes(fromToken.mode)) || allowance.gte(fromAmount))
  }, [allowance, fromAmount, fromToken])

  const [unlockLoading, setUnlockLoading] = useState(false)
  const [approvalTxHash, setApprovalTxHash] = useState('')

  const approve = useCallback(async () => {
    setUnlockLoading(true)
    const approvalAmount = window.localStorage.getItem(INFINITE_UNLOCK) === 'true' ? LARGEST_UINT256 : fromAmount
    try {
      const tx = await approveToken(ethersProvider, fromToken, approvalAmount)
      console.log(`approveToken :: tx/result ::`)
      console.log(tx)

      setApprovalTxHash(tx.hash)
      console.log('approveToken :: tx.wait() :: start')
      await tx.wait()
      setAllowance(approvalAmount)
      console.log('approveToken :: tx.wait() :: end')
    } catch (approveError) {
      logError({
        approveError,
        fromToken,
        approvalAmount: approvalAmount.toString(),
        account,
      })
      throw approveError
    } finally {
      setApprovalTxHash('')
      setUnlockLoading(false)
    }
  }, [fromAmount, fromToken, ethersProvider, account])

  const clearAllowApprove = () => {
    setAllowance(BigNumber.from(0))
    setAllowed(false)
  }

  return { allowed, unlockLoading, approvalTxHash, approve, clearAllowApprove }
}
