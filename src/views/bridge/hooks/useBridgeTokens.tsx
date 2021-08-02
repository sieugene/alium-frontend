import { Token } from '@alium-official/sdk'
import DEFAULT_LIST from 'config/tokens'
import { useActiveWeb3React } from 'hooks'
import { useStoreBridge } from 'store/bridge/useStoreBridge'

export const useBridgeTokens = (addressOrName: string) => {
  const { account } = useActiveWeb3React()
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const toNetwork = useStoreBridge((state) => state.toNetwork)

  const defaultListFrom = DEFAULT_LIST[fromNetwork]
  const defaultListTo = DEFAULT_LIST[toNetwork]
  const allLists: Token[] = [...defaultListFrom.tokens, ...defaultListTo.tokens]

  const tokens = {
    fromNetwork: searchToken(allLists, addressOrName, fromNetwork),
    toNetwork: searchToken(allLists, addressOrName, toNetwork),
  }

  //   const fromBalance = useBalanceAnotherChain(fromNetwork, account, tokens.fromNetwork)
  //   const toBalance = useBalanceAnotherChain(toNetwork, account, tokens.toNetwork)

  //   const balances = {
  //     fromNetwork: fromBalance,
  //     toNetwork: toBalance,
  //   }

  return { tokens }
}

const searchToken = (list: Token[], search: string, chainId: number) => {
  const token = list.find((token) => (token.symbol === search || token.address === search) && token.chainId === chainId)
  return token && new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
}

// const useBalanceAnotherChain = (chainId: number, account: string, token: Token) => {
//   const [balancedToken, setBalancedToken] = React.useState(null)
//   const validatedToken: Token = token && isAddress(token?.address) && token
//   const validatedTokenAddress = validatedToken?.address
//   const calls = [
//     {
//       address: validatedTokenAddress,
//       name: 'balanceOf',
//       params: [account],
//     },
//   ]

//   const multicallFetch = async () => {
//     if (!balancedToken) {
//       const result = await multicall(ERC20_ABI, calls, chainId)
//       const balance = result?.returnData.map((el) => (el === '0x' ? 0 : el))
//       setBalancedToken(new TokenAmount(token, balance || 0))
//     }
//   }
//   multicallFetch()

//   return balancedToken
// }
