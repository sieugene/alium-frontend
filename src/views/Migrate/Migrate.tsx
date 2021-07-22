import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { CardNav } from 'components/CardNav'
import ERC20_ABI from 'config/abi/erc20.json'
import { useActiveWeb3React } from 'hooks'
import { useLPTokenContract, useTokenContract, useVampireContract } from 'hooks/useContract'
import { FC, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasPrice } from 'utils'
import multicall from 'utils/multicall'
import { Step1Connect } from 'views/Migrate/components/Step1Connect'
import { Step2YourLiquidity } from 'views/Migrate/components/Step2YourLiquidity'
import { Step3Migrating } from 'views/Migrate/components/Step3Migrating'
import { Step4MigrationResult } from 'views/Migrate/components/Step4MigrationResult'
import SwapAppBody from 'views/Swap/SwapAppBody'

const Root = styled.div``

const ViewMigrate: FC = () => {
  // --- STORE ---
  const currentNetworkId = useStoreNetwork((state) => state.currentNetwork.id)
  const vampiringAddress = useStoreNetwork((state) => state.currentNetwork.address.vampiring)
  const liquidityProviderTokens = useStoreNetwork((state) => state.currentNetwork.liquidityProviderTokens)
  const blockExplorerUrl = useStoreNetwork((state) => state.currentNetwork.providerParams.blockExplorerUrls[0])

  // --- STATE ---
  const [step, setStep] = useState(2)
  const [pairs, setPairs] = useState<
    { title: string; symbolA: string; symbolB: string; addressLP: string; exchange: string; balance: number }[]
  >([])
  const [selectedPairKey, setSelectedPairKey] = useState(-1)
  const [tokensAmount, setTokensAmount] = useState<string | number>(0)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [contract, setContract] = useState()

  // --- DESTRUCTURING
  const currentPair = pairs[selectedPairKey]

  // --- HOOKS ---
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const tokenContract = useTokenContract(currentPair?.addressLP)
  const lpTokenContract = useLPTokenContract(currentPair?.addressLP)
  const vampireContract = useVampireContract(vampiringAddress)

  useEffect(() => {
    account && step === 1 && setStep(2)
    !account && setStep(1)
    setSelectedPairKey(-1)
    setTokensAmount(0)
    setIsSuccessful(false)
    setPairs([])

    const fetchAllBalances = async () => {
      const lpt = liquidityProviderTokens
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

      setPairs(newPairs)
    }

    if (account) fetchAllBalances()
  }, [account, currentNetworkId])

  const handleMigrate = async () => {
    if (selectedPairKey !== -1 && currentPair.balance >= Number(tokensAmount) && Number(tokensAmount) >= 0.01) {
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
        const gasLimit = await lpTokenContract.estimateGas.approve(vampiringAddress, MaxUint256).catch(() => {
          useExact = true
          return lpTokenContract.estimateGas.approve(vampiringAddress, tokensAmountWei)
        })

        const gasPrice = await calculateGasPrice(tokenContract.provider)

        lpTokenContract
          .approve(vampiringAddress, tokensAmountWei, { gasLimit, gasPrice, from: account })
          .then(async (response) => {
            addTransaction(response, {
              summary: `Approve ${currentPair.title} from ${currentPair.exchange}`,
              approval: { tokenAddress: currentPair.addressLP, spender: account },
            })

            setIsSuccessful(false)

            await vampireContract.estimateGas
              .deposit(pairId, tokensAmountWei, { from: account })
              .then(async (gasLimit2) => {
                vampireContract
                  .deposit(pairId, tokensAmountWei, { from: account, gasLimit: gasLimit2 })
                  .then((resp) => {
                    setContract(resp.hash)
                    resp.wait().then(() => {
                      setIsSuccessful(true)
                      setStep(4)
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
              })
          })
          .catch((err: Error) => {
            setIsSuccessful(false)
            setStep(4)
            console.error(err)
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
            key={currentNetworkId}
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
            explorer={blockExplorerUrl}
            setStep1={() => setStep(1)}
            handleTryAgain={handleMigrate}
          />
        )}
      </SwapAppBody>
    </Root>
  )
}

export default ViewMigrate
