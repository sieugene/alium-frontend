import { farms as farmsConfig } from 'config/constants/farms'
import { Farm } from 'state/types'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'
import { FarmWithUserData } from './../../state/types'

export interface StoreFarmsState {
  farms: Farm[]
  setFarms: (farms: Farm[]) => void
  setFarmsUserData: (farms: FarmWithUserData[]) => void
  farmsLoading: boolean
  farmsUserDataLoading: boolean
  toggleFarmsFetched: (loading: boolean) => void
  toggleUserDataFarmsFetched: (loading: boolean) => void
}

const noAccountFarmConfig: Farm[] = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

// store for usage outside of react
export const storeFarms = createVanilla<StoreFarmsState>((set, get) => ({
  farmsLoading: false,
  farmsUserDataLoading: false,
  farms: noAccountFarmConfig,
  toggleFarmsFetched: (loading) => {
    set({ farmsLoading: loading })
  },
  toggleUserDataFarmsFetched: (loading) => {
    set({ farmsUserDataLoading: loading })
  },
  setFarms: (farms) => {
    const data = get().farms
    const changedFarm = data.map((farm) => {
      const liveFarmData = farms.find((farmData) => farmData.pid === farm.pid)
      return { ...farm, ...liveFarmData }
    })
    set({ farms: changedFarm })
  },
  setFarmsUserData: (farms) => {
    const data = get().farms
    farms.forEach((userDataEl) => {
      const { pid } = userDataEl
      const index = data.findIndex((farm) => farm.pid === pid)
      data[index] = { ...data[index], userData: userDataEl }
    })
    set({ farms: data })
  },
}))

// store for usage inside of react
export const useStoreFarms = create<StoreFarmsState>(storeFarms)
