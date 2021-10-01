import { Skeleton } from 'alium-uikit/src'
import { useMemo } from 'react'
import { ethersToBigNumber } from 'utils/bigNumber'
import { useCurrentPoolId } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as PoolIcon } from './pool.svg'

export default function OpenedPoolsCard() {
  const { data: currentPoolId } = useCurrentPoolId()
  // add 1 cuz currentPoolId starts with 0
  const value = useMemo(() => currentPoolId?.add(1), [currentPoolId])
  return (
    <StatsCard
      icon={<PoolIcon />}
      title={<Title>Opened pools</Title>}
      content={value ? <StatsCard.Value value={ethersToBigNumber(value)} /> : <Skeleton height='100%' />}
    />
  )
}
