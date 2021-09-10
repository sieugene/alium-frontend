import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const ALM_PER_BLOCK = new BigNumber(7).multipliedBy(10^18)
export const BSC_BLOCK_TIME = 3
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) 
export const ALM_PER_YEAR = ALM_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const CAKE_POOL_PID = 1
export const BASE_EXCHANGE_URL = 'https://exchange.dev.alium.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
