import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { CardNav } from 'components/CardNav'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useFactoryContract, useLPTokenContract, useVampireContract } from 'hooks/useContract'
import { FC, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasMargin, calculateGasPrice } from 'utils'
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
  const [contract, setContract] = useState('')
  const [aliumLPTokenForPair, setAliumLPTokenForPair] = useState('')
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isLoadingPairs, setIsLoadingPairs] = useState(false)

  // --- DESTRUCTURING STATE ---
  const currentPair = pairs[selectedPairKey]

  // --- HOOKS ---
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const lpTokenContract = useLPTokenContract(currentPair?.addressLP)
  const vampireContract = useVampireContract(currentNetwork.address.vampiring)
  const factoryContract = useFactoryContract(currentNetwork.address.factory)

  const setDefaultState = async () => {
    setStep(account ? 2 : 1)
    setPairs([])
    setSelectedPairKey(-1)
    setTokensAmount(0)
    setContract('')
    setAliumLPTokenForPair('')
    setIsSuccessful(false)
    setIsLoadingPairs(false)
  }

  const handleGetReadyToMigrateTokens = async () => {
    await setIsLoadingPairs(true)
    await setPairs(await getReadyToMigrateTokens(account))
    await setIsLoadingPairs(false)
  }

  useEffect(() => {
    ;(async () => {
      await setDefaultState()
      await handleGetReadyToMigrateTokens()
    })()
  }, [account, currentNetwork])

  const handleMigrate = async () => {
    // return if pair not selected or input amount out of balance
    if (selectedPairKey === -1 || currentPair.balance < Number(tokensAmount)) return

    // set loading
    setStep(3)

    // --- GET PAIR CONTRACT ID
    const countLPTokens = await vampireContract.lpTokensInfoLength()
    let pairId: number
    for (let i = 0; i <= countLPTokens; i++) {
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
      return
    }

    // --- GET PAIR ADDRESS
    let responsePair
    try {
      responsePair = await factoryContract.getPair(currentPair?.addressA, currentPair?.addressB)
      console.info('PAIR: Response:', responsePair)
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! GET PAIR:', err)
      return
    }

    // --- IS CAN APPROVE?
    const tokensAmountWei = parseEther(String(tokensAmount))
    // const allowanceWei: BigNumber = await lpTokenContract.allowance(account, currentNetwork.address.vampiring)
    // const isCanApprove: boolean = allowanceWei >= tokensAmountWei
    // console.log('allowanceWei', allowanceWei) // 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    // console.log('tokensAmountWei', tokensAmountWei)
    // console.log('isCanApprove', isCanApprove)

    // if (!isCanApprove) {
    //   setIsSuccessful(false)
    //   setStep(4)
    //   console.error('handleMigrate: !canApprove')
    //   return
    // }

    // --- APPROVE: STEP 1: GAS ESTIMATE
    let gasEstimateApprove: BigNumber
    try {
      gasEstimateApprove = await lpTokenContract.estimateGas.approve(currentNetwork.address.vampiring, MaxUint256)
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! APPROVE: GAS ESTIMATE:', err)
      return
    }
    const gasLimitApprove: BigNumber = await calculateGasMargin(gasEstimateApprove)
    const gasPriceApprove: BigNumber = await calculateGasPrice(lpTokenContract.provider)

    // --- APPROVE: STEP 2: CALL
    let responseApprove
    try {
      responseApprove = await lpTokenContract.approve(currentNetwork.address.vampiring, MaxUint256, {
        gasLimit: gasLimitApprove,
        gasPrice: gasPriceApprove,
        from: account,
      })
      const resultApprove = await responseApprove.wait()
      console.info('APPROVE: RESULT:', resultApprove)
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! APPROVE: CALL:', err)
      return
    }

    // --- ADD TRANSACTION
    await addTransaction(responseApprove, {
      summary: `Approve ${currentPair.title} from ${currentPair.exchange}`,
      approval: { tokenAddress: currentPair.addressLP, spender: account },
    })

    // --- DEPOSIT: STEP 1: GAS ESTIMATE
    let gasEstimateDeposit
    try {
      gasEstimateDeposit = await vampireContract.estimateGas.deposit(pairId, tokensAmountWei, { from: account })
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! DEPOSIT: GAS ESTIMATE:', err)
      return
    }

    const gasLimitDeposit: BigNumber = await calculateGasMargin(gasEstimateDeposit)
    const gasPriceDeposit: BigNumber = await calculateGasPrice(vampireContract.provider)

    // --- DEPOSIT: STEP 2: CALL
    let responseDeposit
    try {
      responseDeposit = await vampireContract.deposit(pairId, tokensAmountWei, {
        gasLimit: gasLimitDeposit,
        gasPrice: gasPriceDeposit,
        from: account,
      })
      const resultDeposit = await responseDeposit.wait()
      console.info('DEPOSIT: RESULT:', resultDeposit)
    } catch (e) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! DEPOSIT: CALL:', e)
      return
    }

    // --- FINAL
    setAliumLPTokenForPair(responsePair)
    setContract(responseDeposit.hash)
    setIsSuccessful(true)
    setStep(4)
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
