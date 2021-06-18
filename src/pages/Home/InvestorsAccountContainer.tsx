import 'i18n'
import 'inter-ui'
import InvestorsAccount from 'pages/InvestorsAccount'
import Collection from 'pages/InvestorsAccount/Collection'
import { Route } from 'react-router-dom'
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

const InvestorsAccountContainer = () => {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <Route exact strict path="/account" component={InvestorsAccount} />
      <Route exact strict path="/account/collection" component={Collection} />
    </>
  )
}

export default InvestorsAccountContainer
