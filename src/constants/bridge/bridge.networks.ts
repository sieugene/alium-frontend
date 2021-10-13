/* eslint-disable no-param-reassign */
import { isDev } from 'config'
import { GetArrayElementType } from 'types/GetArrayElementType'

export const ETH_XDAI_BRIDGE = 'eth-xdai'
export const BSC_XDAI_BRIDGE = 'bsc-xdai'
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol'
export const ETH_BSC_BRIDGE = 'eth-bsc'
export const BSC_HECO_BRIDGE = 'bsc-heco'
export const BSC_POLYGON_TEST_BRIDGE = 'bsc-polygon_test'
export const BSC_POLYGON_BRIDGE = 'bsc-polygon'
export const BSC_ROPSTEN_BRIDGE = 'bsc-ropsten'
export const BSC_RINKEBY_BRIDGE = 'bsc-rinkeby'

export const getEnabledBridgeDirections = () => {
  if (isDev) {
    // testnet
    return [BSC_HECO_BRIDGE, BSC_POLYGON_TEST_BRIDGE, BSC_RINKEBY_BRIDGE] as const
  } else {
    // mainnnet
    return [BSC_POLYGON_BRIDGE, ETH_BSC_BRIDGE] as const
  }
}
export const ENABLED_BRIDGES = getEnabledBridgeDirections()

export type ENABLED_BRIDGES_ENUMS_TYPE = GetArrayElementType<typeof ENABLED_BRIDGES>
export type ENABLED_BRIDGES_TYPE = typeof ENABLED_BRIDGES

const ETH_XDAI_BRIDGE_CONFIG = {
  label: 'eth⥊xdai',
  homeChainId: 100,
  foreignChainId: 1,
  enableReversedBridge: false,
  enableForeignCurrencyBridge: false,
  foreignMediatorAddress: '0x88ad09518695c6c3712AC10a214bE5109a655671'.toLowerCase(),
  homeMediatorAddress: '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d'.toLowerCase(),
  foreignAmbAddress: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e'.toLowerCase(),
  homeAmbAddress: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59'.toLowerCase(),
  foreignGraphName: 'raid-guild/mainnet-omnibridge',
  homeGraphName: 'raid-guild/xdai-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-xdai.herokuapp.com',
}

const BSC_XDAI_BRIDGE_CONFIG = {
  label: 'bsc⥊xdai',
  homeChainId: 100,
  foreignChainId: 56,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xF0b456250DC9990662a6F25808cC74A6d1131Ea9'.toLowerCase(),
  homeMediatorAddress: '0x59447362798334d3485c64D1e4870Fde2DDC0d75'.toLowerCase(),
  foreignAmbAddress: '0x05185872898b6f94AA600177EF41B9334B1FA48B'.toLowerCase(),
  homeAmbAddress: '0x162E898bD0aacB578C8D5F8d6ca588c13d2A383F'.toLowerCase(),
  foreignGraphName: 'maxaleks/bsc-to-xdai-omnibridge',
  homeGraphName: 'maxaleks/xdai-to-bsc-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-bsc-xdai.herokuapp.com',
}

const KOVAN_SOKOL_BRIDGE_CONFIG = {
  label: 'kovan⥊sokol',
  homeChainId: 77,
  foreignChainId: 42,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xA960d095470f7509955d5402e36d9DB984B5C8E2'.toLowerCase(),
  homeMediatorAddress: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e'.toLowerCase(),
  foreignAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  homeAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  foreignGraphName: 'dan13ram/kovan-omnibridge',
  homeGraphName: 'dan13ram/sokol-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-test-amb.herokuapp.com',
}

const ETH_BSC_BRIDGE_CONFIG = {
  label: 'eth⥊bsc',
  homeChainId: 56,
  foreignChainId: 1,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0x69c707d975e8d883920003CC357E556a4732CD03'.toLowerCase(),
  homeMediatorAddress: '0xD83893F31AA1B6B9D97C9c70D3492fe38D24d218'.toLowerCase(),
  foreignAmbAddress: '0x07955be2967B655Cf52751fCE7ccC8c61EA594e2'.toLowerCase(),
  homeAmbAddress: '0x6943A218d58135793F1FE619414eD476C37ad65a'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const BSC_HECO_BRIDGE_CONFIG = {
  label: 'bsc⥊heco',
  homeChainId: 97,
  foreignChainId: 256,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xa07337f9d69971730996dbfB7e864D2F69de7836'.toLowerCase(),
  homeMediatorAddress: '0x14eBAC6A11208073Fd85ae50fb7f2d044D617889'.toLowerCase(),
  foreignAmbAddress: '0x2d3621f3d388a9Bb03266886879E8DE676331786'.toLowerCase(),
  homeAmbAddress: '0xFcCf929bF9E20586a4B18d333E1Ab065579277B8'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const BSC_POLYGON_TEST_BRIDGE_CONFIG = {
  label: 'bsc⥊polygon_test',
  homeChainId: 97,
  foreignChainId: 80001,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xF4e1D4b0aBd468633C7738911d5Bcf4D5C9204EC'.toLowerCase(),
  homeMediatorAddress: '0x940F1786f6CE6947349A06DD69577f857DEdca8f'.toLowerCase(),
  foreignAmbAddress: '0x0E9953EE0dAa2EfBCE776fEed2ef97239E4fa030'.toLowerCase(),
  homeAmbAddress: '0x395CCf048b40B40C0d6d2Fd826551a0fC3C389B7'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const BSC_POLYGON_BRIDGE_CONFIG = {
  label: 'bsc⥊polygon',
  homeChainId: 56,
  foreignChainId: 137,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0x2ae54585430e3036F6eAf67eA85D33fC0bA195f8'.toLowerCase(),
  homeMediatorAddress: '0x2ae54585430e3036F6eAf67eA85D33fC0bA195f8'.toLowerCase(),
  foreignAmbAddress: '0x7298519c55FD414E0B5364aa01946d954247057A'.toLowerCase(),
  homeAmbAddress: '0x7298519c55FD414E0B5364aa01946d954247057A'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const BSC_ROPSTEN_BRIDGE_CONFIG = {
  label: 'bsc⥊ropsten',
  homeChainId: 97,
  foreignChainId: 3,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0x6547523EDA6c954A1F3D2CcA0e2fa247a3E503a2'.toLowerCase(),
  homeMediatorAddress: '0x46AC33dBA355E7549a2203e230D3088BF0551B77'.toLowerCase(),
  foreignAmbAddress: '0x834589C9e9Ca8C1857658B8dd1090079f4Af1611'.toLowerCase(),
  homeAmbAddress: '0x5767B9c28d84D744c894B22382B1FF521397cd4e'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const BSC_RIKNEBY_BRIDGE_CONFIG = {
  label: 'bsc⥊rinkeby',
  homeChainId: 97,
  foreignChainId: 4,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0x6547523EDA6c954A1F3D2CcA0e2fa247a3E503a2'.toLowerCase(),
  homeMediatorAddress: '0x1a86c9b24E13b5080786C29bD10C58a1E823c540'.toLowerCase(),
  foreignAmbAddress: '0x0E9953EE0dAa2EfBCE776fEed2ef97239E4fa030'.toLowerCase(),
  homeAmbAddress: '0x295049267fa8A1030B27e2dE34E0f73db276a48b'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
}

const bridgeInfo = {
  [ETH_XDAI_BRIDGE]: ETH_XDAI_BRIDGE_CONFIG,
  [BSC_XDAI_BRIDGE]: BSC_XDAI_BRIDGE_CONFIG,
  [KOVAN_SOKOL_BRIDGE]: KOVAN_SOKOL_BRIDGE_CONFIG,
  [ETH_BSC_BRIDGE]: ETH_BSC_BRIDGE_CONFIG,
  [BSC_HECO_BRIDGE]: BSC_HECO_BRIDGE_CONFIG,
  [BSC_POLYGON_TEST_BRIDGE]: BSC_POLYGON_TEST_BRIDGE_CONFIG,
  [BSC_POLYGON_BRIDGE]: BSC_POLYGON_BRIDGE_CONFIG,
  [BSC_ROPSTEN_BRIDGE]: BSC_ROPSTEN_BRIDGE_CONFIG,
  [BSC_RINKEBY_BRIDGE]: BSC_RIKNEBY_BRIDGE_CONFIG,
}
export type BridgeInfoType = typeof bridgeInfo
export type BridgeInfoItemType = BridgeInfoType[keyof BridgeInfoType]

const getNetworkConfig = (bridges: ENABLED_BRIDGES_TYPE) => {
  if (bridges && bridges.length > 0 && bridgeInfo) {
    // @ts-ignore
    const config: unknown = bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {})
    return config as BridgeInfoType
  }
  return bridgeInfo
}

export const networks = getNetworkConfig(ENABLED_BRIDGES)
export const bridgeNetworks = Object.values(networks)
export const bridgeNetworksChains: number[] = Object.values(networks).reduce((chains, network) => {
  chains = [...chains, network.homeChainId, network.foreignChainId]
  return [...new Set(chains)]
}, [])

export const defaultTokens = {
  [ETH_XDAI_BRIDGE]: {
    1: {
      address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
      chainId: 1,
      symbol: 'STAKE',
      name: 'STAKE',
    },
    100: {
      address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
      chainId: 100,
      symbol: 'STAKE',
      name: 'STAKE on xDai',
    },
  },
  [KOVAN_SOKOL_BRIDGE]: {
    42: {
      address: '0xFD2df5dCe4c89B007A43CF88d8161dAf1A17C7AB',
      chainId: 42,
      symbol: 'STAKE',
      name: 'STAKE',
    },
    77: {
      address: '0x408ec1bb883da0ea0fb3c955ea6befcd05aa7c3a',
      chainId: 77,
      symbol: 'STAKE',
      name: 'STAKE on xDai',
    },
  },
  [BSC_XDAI_BRIDGE]: {
    56: {
      address: '0x24e5CF4a0577563d4e7761D14D53C8D0b504E337',
      chainId: 56,
      symbol: 'STAKE',
      name: 'STAKE on xDai on BSC',
    },
    100: {
      address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
      chainId: 100,
      symbol: 'STAKE',
      name: 'STAKE on xDai',
    },
  },
  [ETH_BSC_BRIDGE]: {
    56: {
      address: '0xe55e614862694214f0339adb551393cb56149323',
      chainId: 56,
      symbol: 'STAKE',
      name: 'STAKE on BSC',
    },
    1: {
      address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
      chainId: 1,
      symbol: 'STAKE',
      name: 'STAKE',
    },
  },
  [BSC_HECO_BRIDGE]: {
    97: {
      address: '0x6f58aCfaEB1BfDC9c4959c43aDdE7a3b63BF019f',
      chainId: 97,
      symbol: 'ALM',
      name: 'ALM',
    },
    256: {
      address: '0xfe681ad91bbb8b531623a7cb8c658e4afe500fd9',
      chainId: 256,
      symbol: 'ALM',
      name: 'ALM on HECO testnet',
    },
  },
  [BSC_POLYGON_TEST_BRIDGE]: {
    97: {
      address: '0x6f58aCfaEB1BfDC9c4959c43aDdE7a3b63BF019f',
      chainId: 97,
      symbol: 'ALM',
      name: 'ALM',
    },
    80001: {
      address: '0x58b06772603ad67223bef63ab578f7cb3215771b',
      chainId: 80001,
      symbol: 'ALM',
      name: 'ALM on POLYGON testnet',
    },
  },
  [BSC_POLYGON_BRIDGE]: {
    56: {
      address: '0x7c38870e93a1f959cb6c533eb10bbc3e438aac11',
      chainId: 56,
      symbol: 'ALM',
      name: 'AliumToken',
    },
    137: {
      address: '0x8f6e2e6c0c5cc204ef36ea73d2feb8ecbfe29dd9',
      chainId: 137,
      symbol: 'ALM',
      name: 'AliumToken on Polygon',
    },
  },
  [BSC_ROPSTEN_BRIDGE]: {
    97: {
      address: '0x6f58aCfaEB1BfDC9c4959c43aDdE7a3b63BF019f',
      chainId: 97,
      symbol: 'ALM',
      name: 'ALM',
    },
    3: {
      address: '0x05418f9e8a71a96d9bb58fa6d71533033dc23ac6',
      chainId: 3,
      symbol: 'ALM',
      name: 'ALM on ROPSTEN testnet',
    },
  },
  [BSC_RINKEBY_BRIDGE]: {
    97: {
      address: '0x6f58aCfaEB1BfDC9c4959c43aDdE7a3b63BF019f',
      chainId: 97,
      symbol: 'ALM',
      name: 'ALM',
    },
    4: {
      address: '0x05418f9e8a71a96d9bb58fa6d71533033dc23ac6',
      chainId: 4,
      symbol: 'ALM',
      name: 'ALM on RINKEBY testnet',
    },
  },
}
