import { useWeb3React } from '@web3-react/core'
import { CardNav } from 'components/CardNav'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Step1Connect } from 'views/Migrate/components/Step1Connect'
import { Step2YourLiquidity } from 'views/Migrate/components/Step2YourLiquidity'
import { Step3Migrating } from 'views/Migrate/components/Step3Migrating'
import { Step4MigrationResult } from 'views/Migrate/components/Step4MigrationResult'
import SwapAppBody from 'views/Swap/SwapAppBody'

const Root = styled.div``

const ViewMigrate: FC = () => {
  const { account } = useWeb3React()
  const [step, setStep] = useState(1)
  const [from, setFrom] = useState('AnySwap')
  const [pair, setPair] = useState('ALM/WBNB')
  const [isSuccessful, setIsSuccessful] = useState(true)
  const [contract, setContract] = useState('0xF92dC46ccbC7Dacb0A02F37348003C4a2c23ea78')
  const [explorerLink, setExplorerLink] = useState(
    'https://mumbai.polygonscan.com/address/0xF92dC46ccbC7Dacb0A02F37348003C4a2c23ea78',
  )

  useEffect(() => {
    account && step === 1 && setStep(2)
    !account && setStep(1)
  }, [account])

  return (
    <Root>
      <CardNav activeIndex={2} isWithMigrate={true} />
      <SwapAppBody>
        {step === 1 && <Step1Connect />}
        {step === 2 && <Step2YourLiquidity from={from} pair={pair} />}
        {step === 3 && <Step3Migrating />}
        {step === 4 && (
          <Step4MigrationResult
            from={from}
            pair={pair}
            isSuccessful={isSuccessful}
            contract={contract}
            explorerLink={explorerLink}
          />
        )}
      </SwapAppBody>
    </Root>
  )
}

export default ViewMigrate
