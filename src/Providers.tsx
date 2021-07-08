import Provider from 'providers/InvestorsProvider'
import { FC } from 'react'

const Providers: FC = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default Providers
