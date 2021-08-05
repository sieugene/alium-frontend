import { useBridgeContext } from 'contexts/BridgeContext'
import { useCallback, useEffect, useState } from 'react'
import { POLLING_INTERVAL } from 'utils/bridge/env'
import { logError } from 'utils/bridge/helpers'
import { getMessage, getMessageData, messageCallStatus, NOT_ENOUGH_COLLECTED_SIGNATURES } from 'utils/bridge/message'
import { getEthersProvider } from 'utils/bridge/providers'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export const useTransactionStatus = (setMessage) => {
  const { homeChainId, getBridgeChainId, getAMBAddress } = useBridgeDirection()
  const { ethersProvider, providerChainId: chainId } = useWeb3Context()
  const isHome = chainId === homeChainId
  const bridgeChainId = getBridgeChainId(chainId)
  const { loading, setLoading, txHash, setTxHash, totalConfirms } = useBridgeContext()
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [confirmations, setConfirmations] = useState(0)

  const completeReceipt = useCallback(() => {
    setTxHash('')
    setLoading(false)
  }, [setLoading, setTxHash])

  const incompleteReceipt = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  useEffect(() => {
    if (!loading) {
      setLoadingText('')
      setConfirmations(0)
    }
  }, [])

  const getStatus = useCallback(async () => {
    try {
      const txReceipt = await ethersProvider.getTransactionReceipt(txHash)
      const numConfirmations = txReceipt ? txReceipt.confirmations : 0
      const enoughConfirmations = numConfirmations >= totalConfirms

      if (txReceipt) {
        setConfirmations(numConfirmations)
        if (enoughConfirmations) {
          if (isHome) {
            setLoadingText('Collecting Signatures')
            const message = await getMessage(isHome, ethersProvider, getAMBAddress(chainId), txHash)
            if (message?.signatures) {
              setNeedsConfirmation(true)
              incompleteReceipt()
              setMessage(message)
              return true
            }
          } else {
            setLoadingText('Waiting for Execution')
            const bridgeProvider = await getEthersProvider(bridgeChainId)
            const bridgeAmbAddress = getAMBAddress(bridgeChainId)

            const { messageId } = await getMessageData(isHome, ethersProvider, txHash, txReceipt)
            const status = await messageCallStatus(bridgeAmbAddress, bridgeProvider, messageId)
            if (status) {
              completeReceipt()
              return true
            }
          }
        }
      }
    } catch (txError) {
      if (isHome && txError && txError.message === NOT_ENOUGH_COLLECTED_SIGNATURES) {
        return false
      }
      completeReceipt()
      logError({ txError })
      return true
    }
    return false
  }, [
    isHome,
    txHash,
    ethersProvider,
    totalConfirms,
    completeReceipt,
    incompleteReceipt,
    chainId,
    bridgeChainId,
    getAMBAddress,
    setMessage,
  ])

  useEffect(() => {
    if (!loading || !txHash || !ethersProvider) {
      return () => undefined
    }

    const subscriptions = []
    const unsubscribe = () => {
      subscriptions.forEach((s) => {
        clearTimeout(s)
      })
    }

    setLoadingText('Waiting for Block Confirmations')
    let isSubscribed = true

    const updateStatus = async () => {
      unsubscribe()
      const status = !isSubscribed || (await getStatus())
      if (!status && loading && txHash && ethersProvider) {
        unsubscribe()
        const timeoutId = setTimeout(() => updateStatus(), Number(POLLING_INTERVAL) || 5000)
        subscriptions.push(timeoutId)
      }
    }

    updateStatus()

    // unsubscribe when unmount component
    return () => {
      isSubscribed = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    setNeedsConfirmation((needs) => chainId === homeChainId && needs)
  }, [])

  return {
    loadingText,
    needsConfirmation,
    setNeedsConfirmation,
    confirmations,
  }
}
