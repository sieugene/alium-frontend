import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { orderBy } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Farm } from 'state/types'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { getFarmApr } from 'utils/farm/apr'
import { latinise } from 'utils/farm/latinise'
import { getBalanceNumber } from 'utils/formatBalance'
import FarmBanner from './components/FarmBanner'
import FarmCard from './components/FarmCard'
import FarmFilters from './components/FarmFilters'
import FarmGridCard from './components/FarmGridCard'
import FarmTable from './components/FarmTable'
import FarmContainer from './FarmContainer'
import { DesktopColumnSchema, FarmWithStakedValue, ViewMode } from './farms.types'
import { useBnbPriceFromPid, useFarms, usePollFarmsWithUserData } from './hooks/useFarmingPools'

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
  const farmsLP = useFarms()
  // make here real loader!
  const almBnbPrice = useBnbPriceFromPid(1)
  const query = useStoreFarms((state) => state.query)
  const viewMode = useStoreFarms((state) => state.viewMode)
  const sortOption = useStoreFarms((state) => state.sortOption)

  const { account } = useWeb3React()

  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  const { farmsUserDataLoading: userDataLoaded } = usePollFarmsWithUserData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const stakedOnly = useStoreFarms((state) => state.stakedOnly)

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
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.almBnbPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.almBnbPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(
              new BigNumber(farm.poolWeight),
              almBnbPrice,
              totalLiquidity,
              farm.lpAddresses[ChainId.BSCTESTNET],
            )
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR as FarmWithStakedValue[]
    },
    [almBnbPrice, query, isActive],
  )

  const [numberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]) => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(farms, (farm) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0), 'desc')
        case 'earned':
          return orderBy(farms, (farm) => (farm.userData ? Number(farm.userData.earnings) : 0), 'desc')
        case 'liquidity':
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
    isArchived,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol?.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        almBnbPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = () => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a, b) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <FarmTable data={rowData} columns={columns} userDataReady={userDataReady} />
    }
    const TEMP_DEDUPLICATED_DATA = [...chosenFarmsMemoized, ...chosenFarmsMemoized]

    return (
      <FarmGridCard>
        {TEMP_DEDUPLICATED_DATA.map((farm) => (
          <FarmCard key={farm.pid} farm={farm} almBnbPrice={almBnbPrice} />
        ))}{' '}
      </FarmGridCard>
    )
  }

  return (
    <FarmContainer>
      <div>
        <FarmBanner />
        <FarmFilters />
      </div>
      {renderContent()}
    </FarmContainer>
  )
}

export default Farms
