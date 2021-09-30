import { ChainId } from '@alium-official/sdk'
import { TEST_BSC_ALM, TEST_BSC_ETH_Migration, TEST_BSC_USDT_Migration, TEST_BSC_WBNB } from '../../../constants/index'
import { FarmConfig } from '../types'

export const farmsPoolsTestnet: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'ALM-USDT LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0xbd1eb0d2d586f83d21fe50d3f2b369d5504bc556',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_ALM,
    quoteToken: TEST_BSC_USDT_Migration,
  },
  {
    pid: 2,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0x8e3634ff35434c9ab3842f5d06ac9a83b0b6cdfc',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_ETH_Migration,
    quoteToken: TEST_BSC_WBNB,
  },
]
const mocked = farmsPoolsTestnet.map((mock) => ({
  ...mock,
  pid: 2,
  lpSymbol: 'MOCKED TEST' + mock.lpSymbol,
}))
