import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { CardNav } from 'components/CardNav'
import { useActiveWeb3React } from 'hooks'
import { useFactoryContract, useLPTokenContract, useTokenContract, useVampireContract } from 'hooks/useContract'
import { FC, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasPrice } from 'utils'
import { Step1Connect } from 'views/Migrate/components/Step1Connect'
import { Step2YourLiquidity } from 'views/Migrate/components/Step2YourLiquidity'
import { Step3Migrating } from 'views/Migrate/components/Step3Migrating'
import { Step4MigrationResult } from 'views/Migrate/components/Step4MigrationResult'
import { getReadyToMigrateTokens } from 'views/Migrate/lib/getReadyToMigrateTokens'
import SwapAppBody from 'views/Swap/SwapAppBody'

const Root = styled.div``

const ViewMigrate: FC = () => {
  // --- STORE ---
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)

  // --- STATE ---
  const [step, setStep] = useState(2)
  const [pairs, setPairs] = useState<
    {
      title: string
      symbolA: string
      symbolB: string
      addressA: string
      addressB: string
      addressLP: string
      exchange: string
      balance: number
    }[]
  >([])
  const [selectedPairKey, setSelectedPairKey] = useState(-1)
  const [tokensAmount, setTokensAmount] = useState<string | number>(0)
  const [isLoadingPairs, setIsLoadingPairs] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [contract, setContract] = useState('')
  const [aliumLPTokenForPair, setAliumLPTokenForPair] = useState('')

  // --- DESTRUCTURING STATE ---
  const currentPair = pairs[selectedPairKey]

  // --- HOOKS ---
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const tokenContract = useTokenContract(currentPair?.addressLP)
  const lpTokenContract = useLPTokenContract(currentPair?.addressLP)
  const vampireContract = useVampireContract(currentNetwork.address.vampiring)
  const factoryContract = useFactoryContract(currentNetwork.address.factory)

  const handleGetReadyToMigrateTokens = async () => {
    account && step === 1 && setStep(2)
    !account && setStep(1)
    setSelectedPairKey(-1)
    setTokensAmount(0)
    setIsSuccessful(false)
    setPairs([])
    setIsLoadingPairs(true)

    await setPairs(await getReadyToMigrateTokens(account))

    setIsLoadingPairs(false)
  }

  useEffect(() => {
    ;(async () => await handleGetReadyToMigrateTokens())()
  }, [account, currentNetwork])

  const handleMigrate = async () => {
    if (selectedPairKey !== -1 && currentPair.balance >= Number(tokensAmount)) {
      const tokensAmountWei = parseEther(String(tokensAmount))

      setStep(3)
      let pairId
      for (let i = 0; i <= 99; i++) {
        try {
          const res = await vampireContract.lpTokensInfo(i)
          if (res?.lpToken?.toLowerCase() === currentPair.addressLP.toLowerCase()) {
            pairId = i
            break
          }
        } catch (e) {
          console.error(e)
        }
      }

      if (pairId === undefined) {
        setStep(2)
      } else {
        let useExact = false
        const gasLimit = await lpTokenContract.estimateGas
          .approve(currentNetwork.address.vampiring, MaxUint256)
          .catch(() => {
            useExact = true
            return lpTokenContract.estimateGas.approve(currentNetwork.address.vampiring, tokensAmountWei)
          })

        const gasPrice = await calculateGasPrice(tokenContract.provider)

        lpTokenContract
          .approve(currentNetwork.address.vampiring, MaxUint256, { gasLimit, gasPrice, from: account })
          .then((response) => {
            addTransaction(response, {
              summary: `Approve ${currentPair.title} from ${currentPair.exchange}`,
              approval: { tokenAddress: currentPair.addressLP, spender: account },
            })

            vampireContract.estimateGas
              .deposit(pairId, tokensAmountWei, { from: account })
              .then((gasLimit2) => {
                vampireContract
                  .deposit(pairId, tokensAmountWei, { from: account, gasLimit: gasLimit2 })
                  .then((resp) => {
                    resp
                      .wait()
                      .then(() => {
                        factoryContract
                          .getPair(currentPair?.addressA, currentPair?.addressB)
                          .then((response) => {
                            setAliumLPTokenForPair(response)
                            setContract(resp.hash)
                            setIsSuccessful(true)
                            setStep(4)
                          })
                          .catch((err: Error) => {
                            setIsSuccessful(false)
                            setStep(4)
                            console.error('*** factoryContract.getPair:', err)
                          })
                      })
                      .catch((err: Error) => {
                        setIsSuccessful(false)
                        setStep(4)
                        console.error('*** resp.wait():', err)
                      })
                  })
                  .catch((err: Error) => {
                    setIsSuccessful(false)
                    setStep(4)
                    console.error('*** vampireContract.deposit:', err)
                  })
              })
              .catch((err: Error) => {
                setIsSuccessful(false)
                setStep(4)
                console.error('*** vampireContract.estimateGas.deposit:', err)
              })
          })
          .catch((err: Error) => {
            setIsSuccessful(false)
            setStep(4)
            console.error('*** lpTokenContract.approve:', err)
          })
      }
    }
  }

  return (
    <Root>
      <CardNav activeIndex={2} />
      <SwapAppBody>
        {step === 1 && <Step1Connect />}
        {step === 2 && (
          <Step2YourLiquidity
            pairs={pairs}
            selectedPairKey={selectedPairKey}
            setSelectedPairKey={setSelectedPairKey}
            tokensAmount={tokensAmount}
            setTokensAmount={setTokensAmount}
            handleMigrate={handleMigrate}
            isLoadingPairs={isLoadingPairs}
          />
        )}
        {step === 3 && <Step3Migrating />}
        {step === 4 && (
          <Step4MigrationResult
            pair={currentPair}
            isSuccessful={isSuccessful}
            contract={contract}
            explorer={currentNetwork.providerParams.blockExplorerUrls[0]}
            aliumLPTokenForPair={aliumLPTokenForPair}
            setStep1={() => setStep(account ? 2 : 1)}
            handleTryAgain={handleMigrate}
          />
        )}
      </SwapAppBody>
    </Root>
  )
}

export default ViewMigrate
