import { BigNumber } from 'ethers'
import { useApproval } from 'hooks/bridge/useApprovalBridge'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useFeeManager } from 'hooks/bridge/useFeeManager'
import { useMediatorInfo } from 'hooks/bridge/useMediatorInfo'
import { useTotalConfirms } from 'hooks/bridge/useTotalConfirms'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from 'state/hooks'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { fetchToAmount, fetchTokenLimits, fetchToToken, relayTokens } from 'utils/bridge/bridge'
import { ADDRESS_ZERO } from 'utils/bridge/constants'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import {
  getDefaultToken,
  getHelperContract,
  getMediatorAddress,
  getNativeCurrency,
  getNetworkLabel,
  logError,
  parseValue,
} from 'utils/bridge/helpers'
import { fetchTokenDetails } from 'utils/bridge/token'

export const BridgeContext = React.createContext({
  fromAmount: BigNumber.from(0),
  toAmount: BigNumber.from(0),
  toAmountLoading: false,
  setAmount: async (inputAmount: any) => {},
  fromToken: null as BridgeToken | null,
  toToken: null as BridgeToken | null,
  setToToken: (newToToken: BridgeToken) => {},
  setToken: async (tokenWithoutMode: BridgeToken, isQueryToken?: any) => true,
  setDefaultToken: async (chainId: number) => {},
  allowed: false,
  approve: async () => {},
  loading: false,
  setLoading: (toggle: boolean) => {},
  txHash: '',
  setTxHash: (hash: string) => {},
  totalConfirms: 0,
  amountInput: '',
  setAmountInput: (amount: string) => {},
  fromBalance: BigNumber.from(0),
  setFromBalance: (balance: BigNumber) => {},
  toBalance: BigNumber.from(0),
  setToBalance: (balance: BigNumber) => {},
  tokenLimits: null,
  updateTokenLimits: (limits: { minPerTx: any; maxPerTx: any; dailyLimit: any }) => {},
  receiver: '',
  setReceiver: (receiver: string) => {},
  shouldReceiveNativeCur: false,
  setShouldReceiveNativeCur: (should: boolean) => {},
  unlockLoading: false,
  approvalTxHash: '',
  feeManagerAddress: '',
  transfer: null as () => Promise<string>,
})

export const useBridgeContext = () => useContext(BridgeContext)

export const BridgeProvider = ({ children }) => {
  const [queryToken, setQueryToken] = useState('')

  const { isGnosisSafe, ethersProvider, account, providerChainId, connected } = useWeb3Context()
  const { bridgeDirection, getBridgeChainId, foreignChainId } = useBridgeDirection()

  const isHome = true

  const [receiver, setReceiver] = useState('')
  const [amountInput, setAmountInput] = useState('')
  const { fromToken, toToken } = useStoreBridge((state) => state.tokens)
  const setTokens = useStoreBridge((state) => state.setTokens)

  const { fromAmount, toAmount } = useStoreBridge((state) => state.amounts)
  const setAmounts = useStoreBridge((state) => state.setAmounts)

  const [toAmountLoading, setToAmountLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shouldReceiveNativeCur, setShouldReceiveNativeCur] = useState(false)
  const [fromBalance, setFromBalance] = useState(BigNumber.from(0))
  const [toBalance, setToBalance] = useState(BigNumber.from(0))
  const txHash = useStoreBridge((state) => state.txHash)
  const setTxHash = useStoreBridge((state) => state.setTxHash)
  const [tokenLimits, setTokenLimits] = useState(null)

  const { toastError: toast } = useToast()
  const totalConfirms = useTotalConfirms()
  const { currentDay, feeManagerAddress } = useMediatorInfo()
  const { isRewardAddress, homeToForeignFeeType, foreignToHomeFeeType } = useFeeManager()
  const { allowed, unlockLoading, approvalTxHash, approve } = useApproval(fromToken, fromAmount, txHash)

  const feeType = isHome ? homeToForeignFeeType : foreignToHomeFeeType

  const getToAmount = useCallback(
    async (amount) =>
      isRewardAddress ? amount : fetchToAmount(bridgeDirection, feeType, fromToken, toToken, amount, feeManagerAddress),
    [bridgeDirection, feeManagerAddress, fromToken, isRewardAddress, toToken],
  )

  const setAmount = useCallback(
    async (inputAmount) => {
      if (!fromToken || !toToken) return
      setToAmountLoading(true)
      const amount = parseValue(inputAmount, fromToken.decimals)
      const gotToAmount = await getToAmount(amount)

      setAmounts({ fromAmount: amount, toAmount: gotToAmount })
      setToAmountLoading(false)
    },
    [fromToken, getToAmount, toToken],
  )

  const setToToken = useCallback((newToToken: BridgeToken) => {
    const tokens = {
      fromToken,
      toToken: newToToken,
    }
    setTokens(tokens)
  }, [])

  const setToken = useCallback(async (tokenWithoutMode: BridgeToken, isQueryToken = false) => {
    try {
      const [token, gotToToken] = await Promise.all([
        tokenWithoutMode?.address === ADDRESS_ZERO
          ? new BridgeToken({
              ...getNativeCurrency(tokenWithoutMode.chainId),
              mediator: getMediatorAddress(bridgeDirection, tokenWithoutMode),
              helperContractAddress: getHelperContract(tokenWithoutMode.chainId),
            })
          : fetchTokenDetails(bridgeDirection, tokenWithoutMode),
        fetchToToken(bridgeDirection, tokenWithoutMode, getBridgeChainId(tokenWithoutMode.chainId)),
      ])

      setTokens({ fromToken: token, toToken: new BridgeToken({ ...token?.raw, ...gotToToken?.raw }) })
      const label = getNetworkLabel(token.chainId).toUpperCase()
      const storageKey = `${bridgeDirection.toUpperCase()}-${label}-FROM-TOKEN`
      localStorage.setItem(storageKey, JSON.stringify(token))
      return true
    } catch (tokenDetailsError) {
      toast(
        !isQueryToken
          ? 'Cannot fetch token details. Wait for a few minutes and reload the application'
          : 'Token not found.',
      )
      logError({ tokenDetailsError })
      return false
    }
  }, [])

  const transfer = useCallback(
    (): Promise<string> =>
      new Promise((resolve, reject) => {
        setLoading(true)
        if (isGnosisSafe && !receiver) {
          throw new Error('Must set receiver for Gnosis Safe')
        }

        relayTokens(ethersProvider, fromToken, receiver || account, fromAmount, {
          shouldReceiveNativeCur:
            (shouldReceiveNativeCur && toToken?.address === ADDRESS_ZERO && toToken?.mode === 'NATIVE') ||
            !toToken?.address,
          foreignChainId,
        })
          .then((tx) => {
            setTxHash(tx.hash)
            resolve(tx.hash)
          })
          .catch((transferError) => {
            setLoading(false)
            logError({
              transferError,
              fromToken,
              receiver: receiver || account,
              fromAmount: fromAmount.toString(),
              account,
            })
            reject(transferError)
          })
      }),
    [
      account,
      ethersProvider,
      foreignChainId,
      fromAmount,
      fromToken,
      isGnosisSafe,
      receiver,
      shouldReceiveNativeCur,
      toToken,
    ],
  )

  const setDefaultToken = useCallback(async (chainId: number) => {
    if (
      fromToken &&
      toToken &&
      toToken.chainId === chainId &&
      (toToken.address !== ADDRESS_ZERO || toToken.mode === 'NATIVE')
    ) {
      setTokens({ fromToken: toToken, toToken: fromToken })
    } else if (
      !(fromToken && toToken && fromToken.chainId === chainId && toToken.chainId === getBridgeChainId(chainId))
    ) {
      console.log('getDefaultToken', getDefaultToken(bridgeDirection, chainId))
      await setToken(getDefaultToken(bridgeDirection, chainId))
    }
  }, [])

  const updateToken = useCallback(async () => {
    setLoading(true)

    if (!queryToken) {
      await setDefaultToken(providerChainId)
    } else if (
      !(
        fromToken &&
        toToken &&
        fromToken.chainId === providerChainId &&
        toToken.chainId === getBridgeChainId(providerChainId)
      )
    ) {
      // const isQueryTokenSet = await setToken(queryToken, true)
      const isQueryTokenSet = false
      if (!isQueryTokenSet) {
        await setDefaultToken(providerChainId)
      }
      setQueryToken(null)
    }
    setLoading(false)
  }, [])

  const updateTokenLimits = useCallback(async () => {
    if (
      providerChainId &&
      ethersProvider &&
      fromToken &&
      toToken &&
      fromToken.chainId === providerChainId &&
      toToken.chainId === getBridgeChainId(providerChainId) &&
      fromToken.symbol === toToken.symbol &&
      currentDay &&
      bridgeDirection
    ) {
      const limits = await fetchTokenLimits(bridgeDirection, ethersProvider, fromToken, toToken, currentDay)
      setTokenLimits(limits)
    }
  }, [])

  useEffect(() => {
    updateTokenLimits()
  }, [])

  useEffect(() => {
    if (toToken?.chainId === foreignChainId && toToken?.address === ADDRESS_ZERO && toToken?.mode === 'NATIVE') {
      setShouldReceiveNativeCur(true)
    } else {
      setShouldReceiveNativeCur(false)
    }
  }, [])

  useEffect(() => {
    updateToken()
  }, [])
  const value = useMemo(
    () => ({
      fromAmount,
      toAmount,
      toAmountLoading,
      setAmount,
      fromToken,
      toToken,
      setToToken,
      setToken,
      setDefaultToken,
      allowed,
      approve,
      transfer,
      loading,
      setLoading,
      txHash,
      setTxHash,
      totalConfirms,
      amountInput,
      setAmountInput,
      fromBalance,
      setFromBalance,
      toBalance,
      setToBalance,
      tokenLimits,
      updateTokenLimits,
      receiver,
      setReceiver,
      shouldReceiveNativeCur,
      setShouldReceiveNativeCur,
      unlockLoading,
      approvalTxHash,
      feeManagerAddress,
    }),
    [
      allowed,
      amountInput,
      approvalTxHash,
      approve,
      feeManagerAddress,
      fromAmount,
      fromBalance,
      fromToken,
      loading,
      receiver,
      setAmount,
      setDefaultToken,
      setToToken,
      setToken,
      shouldReceiveNativeCur,
      toAmount,
      toAmountLoading,
      toBalance,
      toToken,
      tokenLimits,
      totalConfirms,
      transfer,
      txHash,
      unlockLoading,
      updateTokenLimits,
    ],
  )

  return <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
}
