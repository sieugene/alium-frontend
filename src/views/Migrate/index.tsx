import { BigNumber } from '@ethersproject/bignumber'
import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'
import { CardNav } from 'components/CardNav'
import ERC20_ABI from 'config/abi/erc20.json'
import { useTokenContract, useVampireContract } from 'hooks/useContract'
import { FC, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasMargin, calculateGasPrice } from 'utils'
import multicall from 'utils/multicall'
import { Step1Connect } from 'views/Migrate/components/Step1Connect'
import { Step2YourLiquidity } from 'views/Migrate/components/Step2YourLiquidity'
import { Step3Migrating } from 'views/Migrate/components/Step3Migrating'
import { Step4MigrationResult } from 'views/Migrate/components/Step4MigrationResult'
import SwapAppBody from 'views/Swap/SwapAppBody'

const Root = styled.div``

const ViewMigrate: FC = () => {
  // --- STORE ---
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)

  // --- STATE ---
  const [step, setStep] = useState(1)
  const [pairs, setPairs] = useState<
    { title: string; symbolA: string; symbolB: string; addressLP: string; exchange: string; balance: number }[]
  >([])
  const [selectedPairKey, setSelectedPairKey] = useState(-1)
  const [tokensAmount, setTokensAmount] = useState<string | number>(0)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [contract, setContract] = useState()

  // ---
  const currentPair = pairs[selectedPairKey]

  // --- HOOKS ---
  const { account } = useWeb3React()
  const addTransaction = useTransactionAdder()
  const tokenContract = useTokenContract(currentPair?.addressLP)
  const vampireContract = useVampireContract()

  useEffect(() => {
    account && step === 1 && setStep(2)
    !account && setStep(1)
  }, [account])

  useEffect(() => {
    const fetchAllBalances = async () => {
      const lpt = currentNetwork.liquidityProviderTokens
      const calls = lpt.map(({ tokenLP }) => ({
        address: currentNetwork.address.vampiring,
        name: 'balanceOf',
        params: [tokenLP.address],
      }))
      const res = await multicall(ERC20_ABI, calls)

      let newPairs = []
      res?.returnData?.forEach((el, key) => {
        if (el !== '0x') {
          newPairs = [
            ...newPairs,
            {
              title: `${lpt[key].tokenA.symbol.toUpperCase()}/${lpt[key].tokenB.symbol.toUpperCase()}`,
              symbolA: lpt[key].tokenA.symbol.toUpperCase(),
              symbolB: lpt[key].tokenB.symbol.toUpperCase(),
              addressLP: lpt[key].tokenLP.address,
              exchange: lpt[key].exchange,
              balance: parseInt(el, 16),
            },
          ]
        }
      })
      if (newPairs.length) {
        setPairs(newPairs)
        setSelectedPairKey(-1)
        setTokensAmount(0)
        setIsSuccessful(false)
      }
    }

    if (account) fetchAllBalances()
  }, [account, currentNetwork.id])

  const handleMigrate = async () => {
    if (selectedPairKey !== -1 && currentPair.balance >= Number(tokensAmount) && Number(tokensAmount) > 0) {
      let useExact = false
      const estimatedGas = await tokenContract.estimateGas.approve(account, MaxUint256).catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true
        return tokenContract.estimateGas.approve(account, BigNumber.from(tokensAmount))
      })

      const gasPrice = await calculateGasPrice(tokenContract.provider)

      await tokenContract
        .approve(account, useExact ? BigNumber.from(tokensAmount) : MaxUint256, {
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice,
        })
        .then((response) => {
          console.log('TransactionResponse', response)

          addTransaction(response, {
            summary: `Approve ${currentPair.title} from ${currentPair.exchange}`,
            approval: { tokenAddress: currentPair.addressLP, spender: account },
          })

          setStep(3)
          setIsSuccessful(false)

          const args = [currentPair.balance, BigNumber.from(tokensAmount)]
          vampireContract.estimateGas
            .deposit(...args, { from: account })
            .then((estimatedGasLimit) => {
              vampireContract
                .deposit(...args, { from: account, gasLimit: estimatedGasLimit })
                .then((resp) => {
                  setContract(resp.hash)
                  setIsSuccessful(true)
                  setStep(4)
                })
                .catch((err) => {
                  console.error(err)
                  setStep(4)
                })
            })
            .catch((err) => {
              console.error(err)
              setStep(4)
            })
        })
        .catch((error: Error) => {
          console.error('Failed to approve token', error)
          throw error
        })
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
          />
        )}
        {step === 3 && <Step3Migrating />}
        {step === 4 && (
          <Step4MigrationResult
            pair={currentPair}
            isSuccessful={isSuccessful}
            contract={contract}
            explorer={currentNetwork.providerParams.blockExplorerUrls[0]}
            setStep1={() => setStep(1)}
            handleTryAgain={handleMigrate}
          />
        )}
      </SwapAppBody>
    </Root>
  )
}

export default ViewMigrate
