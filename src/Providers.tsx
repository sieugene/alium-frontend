import Provider from 'providers/InvestorsProvider'
import React from 'react'

const Providers: React.FC = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default Providers
