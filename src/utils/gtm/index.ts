import { Trade } from '@alium-official/sdk'
import { addLiquidityCurrencyFormat, addLiquidityCurrencyFormatPayload } from 'utils/swap/addLiquidityCurrencyFormat'
import { swapTradeFormat } from '../swap/swapTradeFormat'

type GtmDispatchType = (...params: any) => void

const GTM = {
  params: {
    id: 'GTM-MWZ3WL5',
    events: {
      click_intercom: 'click_intercom',
    },
  },
  clickIntercom: (useGTMDispatch: GtmDispatchType) => {
    const event = 'click_intercom'
    gtmLogger(event)
    return useGTMDispatch({ event })
  },
  connectWallet: (useGTMDispatch: GtmDispatchType, network: number) => {
    const event = 'connect_wallet'
    const value = { wallet_network: network }
    gtmLogger(event, value)
    return useGTMDispatch({ event, value })
  },
  swap: (useGTMDispatch: GtmDispatchType, trade: Trade) => {
    const formattedTrade = swapTradeFormat(trade)
    const event = 'swap'
    const value = {
      token: formattedTrade.token,
      value: formattedTrade.value,
    }
    gtmLogger(event, value)
    return useGTMDispatch({ event, value })
  },
  addLiquidity: (
    useGTMDispatch: GtmDispatchType,
    { liquidityMinted, currencies }: addLiquidityCurrencyFormatPayload,
  ) => {
    const formattedAddLiquidity = addLiquidityCurrencyFormat({ liquidityMinted, currencies })
    const event = 'add_liquidity'
    const value = {
      token1: formattedAddLiquidity.token1,
      token2: formattedAddLiquidity.token2,
      value: formattedAddLiquidity.value,
    }
    gtmLogger(event, value)
    return useGTMDispatch({ event, value })
  },
}

const gtmLogger = (log: string, param?: {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '%c GTM ',
      'background: #222; color: #bada55',
      `EVENT - ${log} - PARAM / ${JSON.stringify(param) || ''}`,
    )
  }
}

export default GTM
