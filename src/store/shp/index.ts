import { BigNumber, Contract } from 'ethers'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'

export interface ShpState {
  maxPoolLength?: BigNumber
  fetchMaxPoolLength: (contract: Contract) => any

  currentPoolId?: BigNumber
  fetchCurrentPoolId: (contract: Contract) => any

  rewardToken?: string
  fetchRewardToken: (contract: Contract) => any

  lockedByPoolId: Record<string, BigNumber>
  fetchPoolLocked: (contract: Contract, poolId: BigNumber) => any
  fetchTotalLocked: (contract: Contract, currentPoolId: BigNumber) => any

  lengthByPoolId: Record<string, BigNumber>
  fetchPoolLength: (contract: Contract, poolId: BigNumber) => any
}

export const storeShp = createVanilla<ShpState>((set, get) => ({
  lockedByPoolId: {},
  lengthByPoolId: {},
  async fetchMaxPoolLength(contract) {
    set({
      maxPoolLength: await contract.MAX_POOL_LENGTH(),
    })
  },
  async fetchCurrentPoolId(contract) {
    set({
      currentPoolId: await contract.getCurrentPoolId(),
    })
  },
  async fetchRewardToken(contract) {
    set({
      rewardToken: await contract.rewardToken(),
    })
  },
  async fetchPoolLocked(contract, poolId) {
    set({
      lockedByPoolId: {
        ...get().lockedByPoolId,
        [poolId.toString()]: await contract.totalLockedPoolTokens(poolId),
      },
    })
  },
  async fetchTotalLocked(contract, currentPoolId) {
    const fetchPoolLocked = get().fetchPoolLocked
    await Promise.all(getAllPoolsIds(currentPoolId).map((poolId) => fetchPoolLocked(contract, poolId)))
  },
  async fetchPoolLength(contract, poolId) {
    set({
      lengthByPoolId: {
        ...get().lengthByPoolId,
        [poolId.toString()]: await contract.poolLength(poolId),
      },
    })
  },
}))

export const shpSelectors = {
  totalLocked: (state: ShpState) =>
    Object.values(state.lockedByPoolId).reduce((acc, bn) => acc.add(bn), BigNumber.from(0)),
}

export const useShpStore = create(storeShp)

export function getAllPoolsIds(currentPoolId: BigNumber): BigNumber[] {
  const ids: BigNumber[] = []
  let iterator = currentPoolId
  while (iterator.gte(0)) {
    ids.push(iterator)
    iterator = iterator.sub(1)
  }
  return ids
}
