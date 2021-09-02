import { farms } from 'config/constants/farms'
import { useEffect, useState } from 'react'
import fetchFarms from 'state/farms/fetchFarms'

export const useFarmingPools = () => {
  const [loading, setlLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setlLoading(true)
      const res = await fetchFarms(farms)
      debugger
      setlLoading(false)
    })()
  })
}
