import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as LockedIcon } from './locked.svg'

export default function LockedInPoolsCard() {
  return (
    <StatsCard
      icon={<LockedIcon />}
      title={<Title>Locked in pools</Title>}
      content={<StatsCard.Value value={433453334343} suffix=' ALM' />}
    />
  )
}
