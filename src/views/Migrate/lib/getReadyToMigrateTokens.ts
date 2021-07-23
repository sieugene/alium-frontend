import ERC20_ABI from 'config/abi/erc20.json'
import { storeNetwork } from 'store/network/useStoreNetwork'
import multicall from 'utils/multicall'

type getReadyToMigrateTokens = (
  account: string,
  chainId: any,
) => Promise<
  {
    title: string
    symbolA: string
    symbolB: string
    addressLP: string
    exchange: string
    balance: number
  }[]
>

export const getReadyToMigrateTokens: getReadyToMigrateTokens = async (account) => {
  const { liquidityProviderTokens: lpt } = storeNetwork.getState().currentNetwork
  if (!account) return []

  const calls = lpt.map(({ tokenLP }) => ({
    address: tokenLP.address,
    name: 'balanceOf',
    params: [account],
  }))

  let res
  try {
    res = await multicall(ERC20_ABI, calls)
  } catch (e) {
    console.error('getReadyToMigrateTokens/multicall:', e)
  }

  let pairs = []
  res?.returnData?.forEach((el, key) => {
    const balance = el === '0x' ? 0 : parseInt(el, 16) * 0.000000000000000001
    if (balance > 0) {
      pairs = [
        ...pairs,
        {
          title: `${lpt[key].tokenA.symbol.toUpperCase()}/${lpt[key].tokenB.symbol.toUpperCase()}`,
          symbolA: lpt[key].tokenA.symbol.toUpperCase(),
          symbolB: lpt[key].tokenB.symbol.toUpperCase(),
          addressLP: lpt[key].tokenLP.address,
          exchange: lpt[key].exchange,
          balance: Number(balance)
            .toFixed(18)
            .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'),
        },
      ]
    }
  })

  return pairs
}
