import { defaultAbiCoder } from '@ethersproject/abi'
import { BigNumber, BytesLike } from 'ethers'
import { useEffect, useState } from 'react'
import { storeNetwork } from 'store/network/useStoreNetwork'
import multicall from 'utils/multicall'
import { useMasterChefFarmingContract } from '.'
import ERC20_ABI from '../../../config/abi/erc20.json'
import { PoolInfoFarmResult } from '../farms.types'
import { newTokenChecksummed } from './../../../utils/newTokenChecksummed'

export const useFarmingPools = () => {
  const [loading, setloading] = useState(false)
  const contract = useMasterChefFarmingContract()
  useEffect(() => {
    ;(async () => {
      if (contract) {
        setloading(true)

        const poolLength: BigNumber = await contract.poolLength()
        const poolCount = poolLength?.toNumber() - 1 || 0
        const res: PoolInfoFarmResult = await contract.poolInfo(poolCount)

        const multiplier = res.allocPoint?.div(100)
        const LpTokenInfo = await Bep20LpInfoFetch(res)
      }
    })()
  }, [contract])
}

const Bep20LpInfoFetch = async (farm: PoolInfoFarmResult) => {
  const lpAdress = farm.lpToken
  const calls = [
    {
      address: lpAdress,
      name: 'name',
    },
    {
      address: lpAdress,
      name: 'symbol',
    },
    {
      address: lpAdress,
      name: 'decimals',
    },
    {
      address: lpAdress,
      name: 'totalSupply',
    },
    {
      address: farm[0],
      name: 'balanceOf',
      params: [lpAdress],
    },
  ]

  const multicallData = await multicall(ERC20_ABI, calls)
  const data = multicallData?.returnData || []
  // @ts-ignore
  const token = DecodeLpFarmToken(lpAdress, ...data)
  debugger
}

const DecodeLpFarmToken = (
  address: string,
  _name: BytesLike,
  _symbol: BytesLike,
  _decimals: BytesLike,
  _totalSupply: BytesLike,
  _balanceOf: BytesLike,
) => {
  const currentChainId = storeNetwork.getState().currentChainId
  const name = defaultAbiCoder.decode(['string'], _name)?.[0] as string
  const symbol = defaultAbiCoder.decode(['string'], _symbol)?.[0] as string
  const decimals = defaultAbiCoder.decode(['uint256'], _decimals)?.[0] as BigNumber
  const totalSupply = defaultAbiCoder.decode(['uint256'], _totalSupply)?.[0] as BigNumber
  const balanceOf = defaultAbiCoder.decode(['uint256'], _balanceOf)?.[0] as BigNumber
  const token = newTokenChecksummed(currentChainId, address, decimals?.toNumber(), symbol, name)

  return { token, totalSupply, balanceOf }
}
