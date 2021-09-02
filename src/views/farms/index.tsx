import FarmBanner from './components/FarmBanner'
import FarmCard from './components/FarmCard'
import FarmFilters from './components/FarmFilters'
import FarmTable from './components/FarmTable'
import FarmContainer from './FarmContainer'
import { usePollFarmsWithUserData } from './hooks/useFarmingPools'

const Farms = () => {
  // usePollFarmsPublicData()
  usePollFarmsWithUserData()
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
