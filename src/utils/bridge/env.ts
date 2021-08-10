const env = {
  REACT_APP_DEFAULT_BRIDGE_DIRECTION: 'bsc-heco',
  REACT_APP_INFURA_ID: '9aa3d95b3bc440fa88ea12eaa4456161',
  REACT_APP_GAS_PRICE_SUPPLIER_URL: 'https://gasprice.poa.network/',
  REACT_APP_GAS_PRICE_SPEED_TYPE: 'standard',
  REACT_APP_GAS_PRICE_FALLBACK_GWEI: '50',
  REACT_APP_GAS_PRICE_UPDATE_INTERVAL: '60000',
  REACT_APP_ETH_PRICE_API_URL: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD',
  REACT_APP_ETH_PRICE_UPDATE_INTERVAL: '60000',
  REACT_APP_TITLE: 'OmniBridge - %c',
  REACT_APP_DESCRIPTION:
    'The OmniBridge multi-token extension is the simplest way to transfer ANY ERC20/ERC677/ERC827 token to and from the xDai chain.',
  REACT_APP_UI_STATUS_UPDATE_INTERVAL: '5000',
  REACT_APP_DEBUG_LOGS: 'true',
  REACT_APP_GRAPH_HEALTH_UPDATE_INTERVAL: '60000',
  REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS: '10',
  REACT_APP_RPC_HEALTH_UPDATE_INTERVAL: 60000,
  POLLING_INTERVAL: '5000',

  REACT_APP_XDAI_RPC_URL: 'https://rpc.xdaichain.com https://dai.poa.network',
  REACT_APP_POLYGON_RPC_URL: 'https://rpc-mainnet.matic.quiknode.pro',
  REACT_APP_HECO_RPC_URL: 'https://http-testnet.hecochain.com',
  REACT_APP_SOKOL_RPC_URL: 'https://sokol.poa.network',
  REACT_APP_MAINNET_RPC_URL:
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 https://mainnet-nethermind.blockscout.com/',
  REACT_APP_KOVAN_RPC_URL: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 https://kovan.poa.network/',
  REACT_APP_BSC_RPC_URL: 'https://bsc-dataseed.binance.org/',
  REACT_APP_BSC_TESTNET_RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  REACT_APP_POLYGON_TESTNET_RPC_URL: 'https://rpc-mumbai.maticvigil.com',
  REACT_APP_ROPSTEN_TESTNET_RPC_URL: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  REACT_APP_RINKEBY_TESTNET_RPC_URL: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  GRAPH_HEALTH_ENDPOINT: 'https://api.thegraph.com/index-node/graphql',
}

export const {
  REACT_APP_MAINNET_RPC_URL,
  REACT_APP_XDAI_RPC_URL,
  REACT_APP_SOKOL_RPC_URL,
  REACT_APP_KOVAN_RPC_URL,
  REACT_APP_BSC_RPC_URL,
  REACT_APP_HECO_RPC_URL,
  REACT_APP_BSC_TESTNET_RPC_URL,
  REACT_APP_POLYGON_TESTNET_RPC_URL,
  REACT_APP_ROPSTEN_TESTNET_RPC_URL,
  REACT_APP_RINKEBY_TESTNET_RPC_URL,
  REACT_APP_GRAPH_HEALTH_UPDATE_INTERVAL,
  REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS,
  //   REACT_APP_RPC_HEALTH_UPDATE_INTERVAL,
  REACT_APP_UI_STATUS_UPDATE_INTERVAL,
  REACT_APP_DEFAULT_BRIDGE_DIRECTION,
  REACT_APP_ETH_PRICE_UPDATE_INTERVAL,
  REACT_APP_ETH_PRICE_API_URL,
  REACT_APP_GAS_PRICE_FALLBACK_GWEI,
  REACT_APP_GAS_PRICE_SPEED_TYPE,
  REACT_APP_GAS_PRICE_UPDATE_INTERVAL,
  POLLING_INTERVAL,
  GRAPH_HEALTH_ENDPOINT,
  REACT_APP_POLYGON_RPC_URL,
} = env
