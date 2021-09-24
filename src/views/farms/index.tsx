import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { usePaginate } from 'components/Pagination/hooks/usePaginate'
import { orderBy } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Farm } from 'state/types'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { getFarmApr } from 'utils/farm/apr'
import { latinise } from 'utils/farm/latinise'
import AvailableAccount from 'views/InvestorsAccount/components/AvailableAccount'
import FarmBanner from './components/FarmBanner'
import FarmContent from './components/FarmContent'
import FarmFilters from './components/FarmFilters'
import { FarmPaginate } from './components/FarmPaginate'
import FarmLoader from './components/Loaders/FarmLoader'
import TicketBanner from './components/TicketBanner'
import FarmContainer from './FarmContainer'
import { FarmTab, FarmWithStakedValue } from './farms.types'
import { useFarms, usePollFarmsWithUserData, usePriceAlmBusd } from './hooks/useFarmingPools'

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms = () => {
  const { pathname } = useRouter()
  // Farm hooks
  const farmsLP = useFarms()
  const almPrice = usePriceAlmBusd()
  // Farm Filters
  const query = useStoreFarms((state) => state.query)
  const viewMode = useStoreFarms((state) => state.viewMode)
  const sortOption = useStoreFarms((state) => state.sortOption)
  const stakedOnly = useStoreFarms((state) => state.stakedOnly)
  const activeTab = useStoreFarms((state) => state.activeTab)

  const { account } = useWeb3React()

  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = activeTab === FarmTab.finished
  const isActive = !isInactive && !isArchived
  // Loaders
  const { farmsUserDataLoading: userDataLoaded } = usePollFarmsWithUserData(isArchived)
  const ticketLoader = useStoreFarms((state) => state.ticketLoader)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  // const [stakedOnly] = useUserFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)

        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), almPrice, totalLiquidity, farm.lpAddresses[ChainId.BSCTESTNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        // return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
        return { ...farm, apr: farm?.apy || cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR as FarmWithStakedValue[]
    },
    [almPrice, query, isActive],
  )

  const [numberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]) => {
      switch (sortOption) {
        case 'Hot':
          return orderBy(farms, (farm) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'Multiplier':
          return orderBy(farms, (farm) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0), 'desc')
        case 'Earned':
          return orderBy(farms, (farm) => (farm.userData ? Number(farm.userData.earnings) : 0), 'desc')
        case 'Liquidity':
          return orderBy(farms, (farm) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    isActive,
    isInactive,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  const { items, ...paginate } = usePaginate({ items: chosenFarmsMemoized, pageLimit: 4 })

  return (
    <FarmContainer>
      <AvailableAccount title='Farms'>
        <div>
          <FarmBanner />
          <FarmFilters />
        </div>
        <FarmContent.Container>
          <FarmLoader loading={ticketLoader}>
            <TicketBanner />
            <FarmContent viewMode={viewMode} farms={items} almPrice={almPrice} />
            <FarmPaginate {...paginate} viewMode={viewMode} count={items?.length} />
          </FarmLoader>
        </FarmContent.Container>
      </AvailableAccount>
    </FarmContainer>
  )
}

export default Farms
