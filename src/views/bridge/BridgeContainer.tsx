const backgroundImage = '/images/trade-background.svg'
import styled from 'styled-components'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  width: 100%;
  padding: 48px 20%;
  padding: 48px 24px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  min-height: 100vh;

  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: top right;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: top right;
  }

  padding: 48px 18.6% 32px 18.6%;

  @media screen and (max-width: 1200px) {
    padding: 48px 13.6% 32px 13.6%;
  }

  @media screen and (max-width: 1024px) {
    padding: 48px 25px 25px 25px;
  }

  @media screen and (max-width: 768px) {
    padding: 38px 24px;
  }
  @media screen and (max-width: 500px) {
    //139
    padding: 39% 10px 10px 10px;
    background-position: right top;
    background-size: 156%;
  }
`

const BridgeContainer = ({ children, className }) => {
  return (
    <>
      {/* <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater /> */}
      <AppWrapper>
        <BodyWrapper className={className || ''}>{children}</BodyWrapper>
      </AppWrapper>
    </>
  )
}

export default BridgeContainer
