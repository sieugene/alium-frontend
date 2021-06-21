import 'i18n'
import 'inter-ui'
import styled from 'styled-components'
import 'typeface-roboto'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  padding: 42px 20px;
  width: 100%;
  height: auto;
  background: transparent;

  @media screen and (max-width: 1170px) {
    padding: 0;
  }

  @media screen and (max-width: 850px) {
    padding: 22px 10px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`
export const WrapInvestorsAccounComponent = ({ children }) => {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <AppWrapper>
        <BodyWrapper>{children}</BodyWrapper>
      </AppWrapper>
    </>
  )
}
