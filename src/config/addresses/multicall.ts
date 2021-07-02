import { ChainId } from '@alium-official/sdk'

const MULTICALL_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
  [ChainId.BSCTESTNET]: '0xE226fe842b0A986c86f18c9Fd1A751CAb28bc951',
  [ChainId.HECOMAINNET]: '0x970F84Ce98f4804d5519e5Ab515340B5BAe5a2DB',
  [ChainId.HECOTESTNET]: '0x4763395a9eb252bb509ac78dc409d64b1d9d1b84',
  [ChainId.ETHER_MAINNET]: '',
  [ChainId.ETHER_TESTNET]: '',
  [ChainId.MATIC_MAINNET]: '',
  [ChainId.MATIC_TESTNET]: '',
}

export default MULTICALL_ADDRESS
