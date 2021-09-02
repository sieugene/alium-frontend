import { useEffect, useState } from 'react'
import fetchFarms from 'state/farms/fetchFarms'
import { farms } from './../../../config/constants/farms'

export const useFarmingPools = () => {
  const [loading, setlLoading] = useState(false)
  const farmsList = farms
  useEffect(() => {
    ;(async () => {
      if (loading) return
      setlLoading(true)
      const res = await fetchFarms(farmsList)
      debugger
      setlLoading(false)
    })()
  }, [])
}
