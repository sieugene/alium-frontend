import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as PoolIcon } from './pool.svg'

export default function OpenedPoolsCard() {
  return (
    <StatsCard icon={<PoolIcon />} title={<Title>Opened pools</Title>} content={<StatsCard.Value value={1233} />} />
  )
}
