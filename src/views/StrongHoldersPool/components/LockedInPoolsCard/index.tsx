import { Skeleton } from 'alium-uikit/src'
import { useTotalLocked } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as LockedIcon } from './locked.svg'

export default function LockedInPoolsCard() {
  const value = useTotalLocked()
  return (
    <StatsCard
      icon={<LockedIcon />}
      title={<Title>Locked in pools</Title>}
      content={value ? <StatsCard.Value value={value} suffix=' ALM' /> : <Skeleton height='100%' />}
    />
  )
}
