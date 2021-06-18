import { ChainId } from '@alium-official/sdk'
import MULTICALL_ABI from './abi.json'
import MULTICALL_FUNC_ABI from './multicallFunc.json'
// @ts-ignore
const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.BSCTESTNET]: '0xE226fe842b0A986c86f18c9Fd1A751CAb28bc951'
}
// @ts-ignore
const MULTICALL_FUNC_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb', // TODO
  [ChainId.BSCTESTNET]: '0x67ADCB4dF3931b0C5Da724058ADC2174a9844412'
}

export { MULTICALL_ABI, MULTICALL_FUNC_ABI, MULTICALL_NETWORKS, MULTICALL_FUNC_NETWORKS }
