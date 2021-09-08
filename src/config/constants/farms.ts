import { ChainId } from '@alium-official/sdk'
import { TEST_BSC_ALM, TEST_BSC_ETH_Migration, TEST_BSC_USDT_Migration, TEST_BSC_WBNB } from './../../constants/index'
import { FarmConfig } from './types'

export const farms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'ALM-BNB LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0xAC7CFdE1a1a2930d90721EFA23e6aA2A34e18Fa3',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_ALM,
    quoteToken: TEST_BSC_WBNB,
  },
  {
    pid: 2,
    lpSymbol: 'USDT-ETH LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0xdC9747Fda30F57E6665345358342bB12316F0F27',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_USDT_Migration,
    quoteToken: TEST_BSC_ETH_Migration,
  },
]

export default farms
