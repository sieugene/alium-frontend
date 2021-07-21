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
        address: tokenLP.address,
        name: 'balanceOf',
        params: [account],
      }))
      const res = await multicall(ERC20_ABI, calls)

      let newPairs = []
      res?.returnData?.forEach((el, key) => {
        const balance = el === '0x' ? 0 : parseInt(el, 16) * 0.000000000000000001
        if (balance > 0) {
          newPairs = [
            ...newPairs,
            {
              title: `${lpt[key].tokenA.symbol.toUpperCase()}/${lpt[key].tokenB.symbol.toUpperCase()}`,
              symbolA: lpt[key].tokenA.symbol.toUpperCase(),
              symbolB: lpt[key].tokenB.symbol.toUpperCase(),
              addressLP: lpt[key].tokenLP.address,
              exchange: lpt[key].exchange,
              balance,
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

  // Еще такой момент по работе с контрактом
  // Метод депозит
  // deposit(uint256 _pid, uint256 _amount)
  // он принимает pid - pair id - Это индекс по нему можно получить LP токен
  // и _amount - к-во LP токена
  // т.е. также нужно связать в конфигах LP адрес с pid что бы взаимодействовать с контрактом

  // Можете дергнуть метод lpTokensInfo по циклу с первым аргументом от 0 до 100 например,
  // что бы получить актуальный lpToken в результате

  const handleMigrate = async () => {
    if (selectedPairKey !== -1 && currentPair.balance >= Number(tokensAmount) && Number(tokensAmount) > 0) {
      setStep(3)
      let pairId
      for (let i = 0; i <= 999; i++) {
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
        const estimatedGas = await tokenContract.estimateGas.approve(account, MaxUint256).catch(() => {
          // general fallback for tokens who restrict approval amounts
          useExact = true
          return tokenContract.estimateGas.approve(account, tokensAmount)
        })

        const gasPrice = await calculateGasPrice(tokenContract.provider)

        await tokenContract
          .approve(account, useExact ? tokensAmount : MaxUint256, {
            gasLimit: calculateGasMargin(estimatedGas),
            gasPrice,
          })
          .then(async (response) => {
            addTransaction(response, {
              summary: `Approve ${currentPair.title} from ${currentPair.exchange}`,
              approval: { tokenAddress: currentPair.addressLP, spender: account },
            })

            setIsSuccessful(false)

            await vampireContract.estimateGas
              .deposit(pairId, tokensAmount, { from: account })
              .then(async (estimatedGasLimit) => {
                await vampireContract
                  .deposit(pairId, tokensAmount, { from: account, gasLimit: estimatedGasLimit })
                  .then((resp) => {
                    setContract(resp.hash)
                    setIsSuccessful(true)
                    setStep(4)
                  })
                  .catch((err: Error) => {
                    setIsSuccessful(false)
                    setStep(4)
                    console.error(err)
                  })
              })
              .catch((err: Error) => {
                setIsSuccessful(false)
                setStep(4)
                console.error(err)
              })
          })
          .catch((err: Error) => {
            setIsSuccessful(false)
            setStep(4)
            console.error(err)
            throw err
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
