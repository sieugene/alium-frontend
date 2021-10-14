import BigNumber from 'bignumber.js'
import { BIG_TEN, BIG_ZERO } from 'config'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import { Farm, PublicFarmData } from 'state/types'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { multicallWithDecoder } from 'utils/multicall'
import { getAlmPrice } from 'utils/prices/getAlmPrice'
import { calcApy, calcLiqudityLpFarm } from './farms.functions'
import { lpTokenPriceToStable } from './fetchApy'

const fetchPublicFarmData = async (farm: Farm): Promise<PublicFarmData> => {
  try {
    const { pid, lpAddresses, token, quoteToken } = farm
    const lpAddress = getAddress(lpAddresses)

    const calls = [
      // Balance of token in the LP contract
      {
        address: token.address,
        name: 'balanceOf',
        params: [lpAddress],
      },
      // Balance of quote token on LP contract
      {
        address: quoteToken.address,
        name: 'balanceOf',
        params: [lpAddress],
      },
      // Balance of LP tokens in the master chef contract
      {
        address: lpAddress,
        name: 'balanceOf',
        params: [getMasterChefAddress()],
      },
      // Total supply of LP tokens
      {
        address: lpAddress,
        name: 'totalSupply',
      },
      // Quote token decimals
      {
        address: quoteToken.address,
        name: 'decimals',
      },
    ]

    const [tokenBalanceLP, quoteTokenBalanceLP, farmLpBalanceBn, lpTotalSupply, quoteTokenDecimals] =
      await multicallWithDecoder(erc20, calls)

    // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
    const lpTokenRatio = new BigNumber(farmLpBalanceBn).div(new BigNumber(lpTotalSupply))

    // Raw amount of token in the LP, including those not staked
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

    // Amount of quoteToken in the LP that are staked in the MC
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

    // Total staked in LP, in quote token value
    const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))

    // Only make masterchef calls if farm has pid

    const [info, totalAllocPoint] =
      pid || pid === 0
        ? await multicallWithDecoder(masterchefABI, [
            {
              address: getMasterChefAddress(),
              name: 'poolInfo',
              params: [pid],
            },
            {
              address: getMasterChefAddress(),
              name: 'totalAllocPoint',
            },
          ])
        : [null, null]

    const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)).times(100) : BIG_ZERO

    const depositFee = Number(info?.depositFee) === 0 ? 0 : 100000 / (info?.depositFee * 100) / 100

    // apy fetch and calc
    const farmLpBalanceToStable = await lpTokenPriceToStable(
      token,
      quoteToken,
      tokenBalanceLP,
      quoteTokenBalanceLP,
      lpTotalSupply,
    )

    const apy = calcApy(Number(getAlmPrice()), Number(poolWeight), farmLpBalanceBn, farmLpBalanceToStable)

    const liqudity = calcLiqudityLpFarm(farmLpBalanceToStable, farmLpBalanceBn)

    const lpPrice = new BigNumber(farmLpBalanceToStable)

    const formattedLiqudity = liqudity?.gt(0) ? liqudity.precision(6).toNumber() : 0

    return {
      lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
      multiplier: `${allocPoint.div(100).toString()}X`,
      depositFee,
      apy,
      liqudity: formattedLiqudity,
      lpPrice,
    }
  } catch (error) {
    return {
      lpTotalInQuoteToken: '0',
      multiplier: `${0}X`,
      depositFee: 0,
      apy: 0,
      liqudity: 0,
      lpPrice: BIG_ZERO,
    }
  }
}

export default fetchPublicFarmData
