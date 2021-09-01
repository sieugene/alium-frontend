import FarmBanner from './components/FarmBanner'
import FarmFilters from './components/FarmFilters'
import FarmContainer from './FarmContainer'
import { useFarmingPools } from './hooks/useFarmingPools'

const Farms = () => {
  useFarmingPools()
  return (
    <FarmContainer>
      <div>
        <FarmBanner />
        <FarmFilters />
      </div>
    </FarmContainer>
  )
}

export default Farms
