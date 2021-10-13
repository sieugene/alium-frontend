import { Trade } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { addLiquidityCurrencyFormat, addLiquidityCurrencyFormatPayload } from 'utils/swap/addLiquidityCurrencyFormat'
import { swapTradeFormatGtm } from '../swap/swapTradeFormat'

type GtmDispatchType = (...params: any) => void

const GTM = {
  params: {
    id: 'GTM-MWZ3WL5',
    events: {
      click_intercom: 'click_intercom',
    },
  },
  clickIntercom: (GTMDispatch: GtmDispatchType) => {
    const event = 'click_intercom'
    gtmLogger(event)
    return GTMDispatch({ event })
  },
  connectWallet: (GTMDispatch: GtmDispatchType, network: number) => {
    const event = 'connect_wallet'
    const value = { wallet_network: network }
    gtmLogger(event, value)
    return GTMDispatch({ event, value })
  },
  swap: (GTMDispatch: GtmDispatchType, trade: Trade) => {
    const event = 'swap'
    const value = swapTradeFormatGtm(trade)
    gtmLogger(event, value)
    return GTMDispatch({ event, value })
  },
  addLiquidity: (GTMDispatch: GtmDispatchType, data: addLiquidityCurrencyFormatPayload) => {
    const formattedAddLiquidity = addLiquidityCurrencyFormat(data)
    const event = 'add_liquidity'
    const value = formattedAddLiquidity
    gtmLogger(event, value)
    return GTMDispatch({ event, value })
  },
}

const gtmLogger = (log: string, param?: {}) => {
  console.info('%c GTM ', 'background: #222; color: #bada55', `EVENT - ${log} - PARAM / ${JSON.stringify(param) || ''}`)
}

export const gtmValueToUnitsOfThousands = (value: string) => {
  return `${new BigNumber(value).multipliedBy(10000).toNumber()}`
}

export default GTM
