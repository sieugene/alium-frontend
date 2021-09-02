import FarmBanner from './components/FarmBanner'
import FarmCard from './components/FarmCard'
import FarmFilters from './components/FarmFilters'
import FarmTable from './components/FarmTable'
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
      <FarmTable>
        <FarmCard />
        <FarmCard />
      </FarmTable>
    </FarmContainer>
  )
}

export default Farms
