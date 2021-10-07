import { Skeleton } from 'alium-uikit/src'
import { ethersToBN } from 'utils/bigNumber'
import { useOpenedPools } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as PoolIcon } from './pool.svg'

export default function OpenedPoolsCard() {
  const { data: openedPools } = useOpenedPools()
  return (
    <StatsCard
      icon={<PoolIcon />}
      title={<Title>Opened pools</Title>}
      content={openedPools ? <StatsCard.Value value={ethersToBN(openedPools)} /> : <Skeleton height='100%' />}
    />
  )
}
