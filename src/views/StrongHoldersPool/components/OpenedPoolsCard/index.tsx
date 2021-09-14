import { Skeleton } from 'alium-uikit/src'
import { usePoolsCount } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as PoolIcon } from './pool.svg'

export default function OpenedPoolsCard() {
  const value = usePoolsCount()
  return (
    <StatsCard
      icon={<PoolIcon />}
      title={<Title>Opened pools</Title>}
      content={value ? <StatsCard.Value value={value} /> : <Skeleton height='100%' />}
    />
  )
}
