import { Contract } from '@ethersproject/contracts'
import { useContract } from 'hooks/useContract'
import ALIUM_GAMING_ABI from '../../../constants/abis/farms/AliumGaming1155.json'
import MASTER_CHEF_FARMING_ABI from '../../../constants/abis/farms/MasterChefFarming.json'
import NFT_REWARD_POOL_ABI from '../../../constants/abis/farms/NFTRewardPool.json'
import STRONG_HOLDER_POOL_ABI from '../../../constants/abis/farms/StrongHolderPool.json'

// AliumGaming1155 (ERC1155 Token)    0x6c603fE88437bDf9cFD240bA231D93Fb5426B4Fb
// NFTRewardPool    0xd3c11F591bD83f6cF90C6b90Bce0951e5395cAE9
// StrongHolderPool (SHP)    0x308D6C5886f379377E276DA2656b072f34376dcA
// MasterChef (FARMING)    0x2B526c3435cABb93Aa3f546446d850d891E8A7EE

export function useAliumGamingFarmingContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ALIUM_GAMING_ABI, withSignerIfPossible)
}

export function useMasterChefFarmingContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract('0x2B526c3435cABb93Aa3f546446d850d891E8A7EE', MASTER_CHEF_FARMING_ABI, withSignerIfPossible)
}

export function useNftRewardFarmingContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, NFT_REWARD_POOL_ABI, withSignerIfPossible)
}

export function useStrongHolderPoolFarmingContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, STRONG_HOLDER_POOL_ABI, withSignerIfPossible)
}
