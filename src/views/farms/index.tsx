import FarmBanner from './components/FarmBanner'
import FarmFilters from './components/FarmFilters'
import FarmContainer from './FarmContainer'

const Farms = () => {
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
