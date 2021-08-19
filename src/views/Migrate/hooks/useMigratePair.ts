import { Pair, Token } from '@alium-official/sdk'
import { USER_LOCALSTORAGE_KEY } from 'constants/localstorage'
import { usePair } from 'data/Reserves'
import { useFindLiqudityAfterAdd } from 'hooks/liqudity/useFindLiqudityAfterAdd'
import { useCallback, useEffect, useMemo } from 'react'
import { SerializedPair } from 'state/user/actions'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { AppState } from './../../../state/index'
import { MigratePair } from './../lib/migrate.types'

/**
 * Pair creator and saver for Migrate tokens.
 * Auto search pairs if exist, checkout in localstorage.
 * Save if finded in pool and not saved in localstorage.
 */
export const useCreateMigratePair = (currentPair: MigratePair) => {
  const chainId = useStoreNetwork((state) => state.currentChainId)

  // Creator
  const currencyA = useMemo(
    () => currentPair && new Token(chainId, currentPair.addressA, 18, currentPair.symbolA, currentPair.title),
    [chainId, currentPair],
  )
  const currencyB = useMemo(
    () => currentPair && new Token(chainId, currentPair.addressB, 18, currentPair.symbolB, currentPair.title),
    [chainId, currentPair],
  )
  const [, pair] = usePair(currencyA, currencyB)

  // Finder
  const findPair = useMemo(() => pair, [pair])

  // Validate and save
  // pair can find only after adding(if not added before), use this finder for save and add
  usePairUpdater(currentPair, findPair)
}

const usePairUpdater = (currentPair: MigratePair, findPair: Pair) => {
  const findPairAfterAdd = useFindLiqudityAfterAdd(findPair)
  const chainId = useStoreNetwork((state) => state.currentChainId)

  const savePair = useCallback(() => {
    const userLocalstorage = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    const state: AppState['user'] = JSON.parse(userLocalstorage)

    if (state?.pairs && currentPair && findPair) {
      const pairs = state.pairs[chainId] ? Object.values(state.pairs[chainId]) : []
      const pairIsSaved =
        pairs?.length && pairs.find((pair) => finderEqualsTokenPair(pair, currentPair?.addressA, currentPair?.addressB))

      if (!pairIsSaved) {
        findPairAfterAdd()
      }
    }
  }, [chainId, currentPair, findPairAfterAdd, findPair])

  useEffect(() => {
    savePair()
  }, [currentPair, findPair, savePair])
}

// Helpers

const finderEqualsTokenPair = (pair: SerializedPair, addressA: string, addressB: string) => {
  return Boolean(
    (pair?.token0?.address === addressA && pair?.token1?.address === addressB) ||
      (pair?.token0?.address === addressB && pair?.token1?.address === addressA),
  )
}
