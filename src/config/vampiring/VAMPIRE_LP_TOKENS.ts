import { ChainId } from '@alium-official/sdk'

export interface liquidityProviderTokensItem {
  tokenA: { symbol: string; address: string }
  tokenB: { symbol: string; address: string }
  tokenLP: { address: string }
  exchange: 'Uniswap' | 'Sushiswap' | 'Pancakeswap' | 'Quickswap' | 'Dfyn Exchange' | 'MDEX'
}

// prettier-ignore
const BSC: liquidityProviderTokensItem[] = [
  { tokenA: { symbol: 'cake'  , address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' }, tokenB: { symbol: 'wbnb'    , address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }, tokenLP: { address: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'wbnb'  , address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }, tokenB: { symbol: 'busd'    , address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' }, tokenLP: { address: '0x1B96B92314C44b159149f7E0303511fB2Fc4774f' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'usdt'  , address: '0x55d398326f99059ff775485246999027b3197955' }, tokenB: { symbol: 'busd'    , address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' }, tokenLP: { address: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'usdt'  , address: '0x55d398326f99059ff775485246999027b3197955' }, tokenB: { symbol: 'wbnb'    , address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }, tokenLP: { address: '0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'eth'   , address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8' }, tokenB: { symbol: 'wbnb'    , address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }, tokenLP: { address: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'usdc'  , address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' }, tokenB: { symbol: 'busd'    , address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' }, tokenLP: { address: '0x680Dd100E4b394Bda26A59dD5c119A391e747d18' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'eth'   , address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8' }, tokenB: { symbol: 'btcb'    , address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c' }, tokenLP: { address: '0x7380E10F5C5f9DFF4857de3cf9c39Bb16F4C6dcf' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'btcb'  , address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c' }, tokenB: { symbol: 'busd'    , address: '0xe9e7cea3dedca5984780bafc599bd69add087d56' }, tokenLP: { address: '0xb8875e207EE8096a929D543C9981C9586992eAcb' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'btcb'  , address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c' }, tokenB: { symbol: 'wbnb'    , address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' }, tokenLP: { address: '0x7561EEe90e24F3b348E1087A005F78B4c8453524' }, exchange: 'Pancakeswap' },
  { tokenA: { symbol: 'usdt'  , address: '0x55d398326f99059ff775485246999027b3197955' }, tokenB: { symbol: 'usdc'    , address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d' }, tokenLP: { address: '0x85F8628BFFF75D08F1Aa415E5C7e85d96bfD7f57' }, exchange: 'Pancakeswap' },
]

// prettier-ignore
const HECO: liquidityProviderTokensItem[] = [
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'usdc'    , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenLP: { address: '0x85c5316C7C7D88dA9337fCcdEEF4A9891fCD5e6F' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'USDC'  , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenB: { symbol: 'usdt'    , address: '0xa71edc38d189767582c38a3145b5873052c3e47a' }, tokenLP: { address: '0xf37DE9f4E1a0A58F839DbA868e76B5779109c2a4' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'weth'    , address: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd' }, tokenLP: { address: '0x53E458aD1CFEB9582736db6BdE9aF89948e3bc3d' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'USDC'  , address: '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b' }, tokenB: { symbol: 'dai'     , address: '0x3d760a45d0887dfd89a2f5385a236b29cb46ed2a' }, tokenLP: { address: '0x2d6884276dAD0d20755Df8857eBfBb30726488ee' }, exchange: 'MDEX' },
  { tokenA: { symbol: 'WHT'   , address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f' }, tokenB: { symbol: 'usdt'    , address: '0xa71edc38d189767582c38a3145b5873052c3e47a' }, tokenLP: { address: '0x499B6E03749B4bAF95F9E70EeD5355b138EA6C31' }, exchange: 'MDEX' },
]

// prettier-ignore
const ETHER: liquidityProviderTokensItem[] = [
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'usdc'   , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenLP: { address: '0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'eth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'uni'   , address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xd3d2E2692501A5c9Ca623199D38826e513033a17' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'mkr'   , address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' }, tokenB: {	symbol: 'eth'    , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC2aDdA861F89bBB333c90c492cB837741916A225' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'usdc'   , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenLP: { address: '0x004375Dff511095CC5A197A54140a24eFEF3A416' }, exchange: 'Uniswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0xB20bd5D04BE54f870D5C0d3cA85d82b34B836405' }, exchange: 'Uniswap' },

  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xCEfF51756c56CeFFCA006cD410B03FFC46dd3a58' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'usdc'  , address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'sushi' , address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'eth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenB: {	symbol: 'usdt'   , address: '0xdac17f958d2ee523a2206206994597c13d831ec7' }, tokenLP: { address: '0x06da0fd433C1A5d7a4faa01111c044910A184553' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'dai'   , address: '0x6b175474e89094c44da98b954eedeac495271d0f' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'yfi'   , address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'aave'  , address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xD75EA151a61d06868E31F8988D28DFE5E9df57B4' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'link'  , address: '0x514910771af9ca656af840dff83e8264ecf986ca' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' }, tokenB: {	symbol: 'ibbtc'  , address: '0xc4e15973e6ff2a35cc804c2cf9d2a1b817a8b40f' }, tokenLP: { address: '0x18d98D452072Ac2EB7b74ce3DB723374360539f1' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'mkr'   , address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0xBa13afEcda9beB75De5c56BbAF696b880a5A50dD' }, exchange: 'Sushiswap' },
  { tokenA: { symbol: 'sushi' , address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2' }, tokenB: {	symbol: 'weth'   , address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' }, tokenLP: { address: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0' }, exchange: 'Sushiswap' },
]

// prettier-ignore
const MATIC: liquidityProviderTokensItem[] = [
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'mimatic', address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1' }, tokenLP: { address: '0x160532D2536175d65C03B97b0630A9802c274daD' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'weth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'wbtc'  , address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' }, tokenB: {	symbol: 'weth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'usdt'   , address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }, tokenLP: { address: '0x2cF7252e74036d1Da831d11089D326296e64a728' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'wmatic', address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }, tokenB: {	symbol: 'weth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0xadbF1854e5883eB8aa7BAf50705338739e558E5b' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'weth'  , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenB: {	symbol: 'usdt'   , address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }, tokenLP: { address: '0xF6422B997c7F54D1c6a6e103bcb1499EeA0a7046' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'dai'    , address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063' }, tokenLP: { address: '0xf04adBF75cDFc5eD26eeA4bbbb991DB002036Bdd' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'weth'  , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenB: {	symbol: 'aave'   , address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b' }, tokenLP: { address: '0x90bc3E68Ba8393a3Bf2D79309365089975341a43' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'link'  , address: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39' }, tokenB: {	symbol: 'weth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0x5cA6CA6c3709E1E6CFe74a50Cf6B2B6BA2Dadd67' }, exchange: 'Quickswap' },
  { tokenA: { symbol: 'wmatic', address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }, tokenB: {	symbol: 'usdc'   , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenLP: { address: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827' }, exchange: 'Quickswap' },

  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'usdt'   , address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }, tokenLP: { address: '0xBe40F7Fff5A2235aF9a8cb79A17373162eFeFA9C' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'dai'    , address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063' }, tokenLP: { address: '0xb7bd6d48C9b1aF7E126d0389C6970F157D974f33' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'dai'   , address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063' }, tokenB: {	symbol: 'usdt'   , address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }, tokenLP: { address: '0xdd228fdC8A41A02BDEa72060F53C1f88A2FD48B6' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'wbtc'  , address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' }, tokenB: {	symbol: 'eth'    , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0x39eAA90a70E8FdC04E1f63Db04e1c62c9aCe0641' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'usdc'  , address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' }, tokenB: {	symbol: 'eth'    , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0x7D51bAd48d253dae37cC82cad07f73849286Deec' }, exchange: 'Dfyn Exchange' },
// {tokenA: { symbol: 'ust'   , address: '                                          ' }, tokenB: {	symbol: 'usdt'   , address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f' }, tokenLP: { address: '                                          ' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'wmatic', address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }, tokenB: {	symbol: 'eth'    , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenLP: { address: '0x2FE46369b1C261Be62F9fD327ff5A9B17Ab0F451' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'eth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenB: {	symbol: 'uni'    , address: '0xb33eaad8d922b1083446dc23f610c2567fb5180f' }, tokenLP: { address: '0xb5E1a07c9b6aB3BEe8d9Bf4066D324c5da89C07F' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'fish'  , address: '0x3a3df212b7aa91aa0402b9035b098891d276572b' }, tokenB: {	symbol: 'wmatic' , address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' }, tokenLP: { address: '0xB1Eda2fbCb02da970C1aAcd26eCF434BfeE5B674' }, exchange: 'Dfyn Exchange' },
  { tokenA: { symbol: 'eth'   , address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619' }, tokenB: {	symbol: 'aave'   , address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b' }, tokenLP: { address: '0x7162c0AcF32820920a741D8fA466b8e6D60D530D' }, exchange: 'Dfyn Exchange' },
]

export const VAMPIRE_LP_TOKENS: { [chainId in ChainId]: liquidityProviderTokensItem[] } = {
  [ChainId.MAINNET]: BSC,
  [ChainId.BSCTESTNET]: BSC,
  [ChainId.HECOMAINNET]: HECO,
  [ChainId.HECOTESTNET]: HECO,
  [ChainId.ETHER_MAINNET]: ETHER,
  [ChainId.ETHER_TESTNET]: ETHER,
  [ChainId.MATIC_MAINNET]: MATIC,
  [ChainId.MATIC_TESTNET]: MATIC,
}
