import farmsConfig from './farms'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.lpSymbol)

export { default as ifosConfig } from './ifo'
export { default as poolsConfig } from './pools'
export { farmsConfig, communityFarms }
