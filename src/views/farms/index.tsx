import FarmBanner from './components/FarmBanner'
import FarmFilters from './components/FarmFilters'
import FarmContainer from './FarmContainer'

const Farms = () => {
  // const contract = useMasterChefFarmingContract()
  // useEffect(() => {
  //   ;(async () => {
  //     if (contract) {
  //       debugger
  //       const length = await contract.poolLength()
  //       const res = await contract.poolInfo(length)

  //       debugger
  //     }
  //   })()
  // }, [contract])
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
