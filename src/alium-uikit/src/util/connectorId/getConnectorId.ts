import Cookies from 'universal-cookie'
import { connectorLocalStorageKey } from '../../config'
import { ConnectorNames } from '../../widgets/WalletModal'

const cookies = new Cookies()

type getConnectorId = () => typeof ConnectorNames[keyof typeof ConnectorNames] | null

const getConnectorId: getConnectorId = () => {
  return (cookies.get(connectorLocalStorageKey) as ConnectorNames) ?? null
}

export default getConnectorId
