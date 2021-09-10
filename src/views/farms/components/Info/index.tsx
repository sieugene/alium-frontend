import { useWeb3React } from '@web3-react/core'
import { AddIcon, Button, IconButton, MinusIcon, Skeleton, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import QuestionHelper from 'components/QuestionHelper'
import { useTokenContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import DepositModal from 'views/farms/components/Modals/DepositModal'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import useApproveFarm from 'views/farms/hooks/useApproveFarm'
import {
  farmUserDataUpdate,
  useFarmsLoading,
  useLpTokenPrice,
  usePriceCakeBusd,
} from 'views/farms/hooks/useFarmingPools'
import useHarvestFarm from 'views/farms/hooks/useHarvestFarm'
import useStakeFarms from 'views/farms/hooks/useStakeFarms'
import useUnstakeFarms from 'views/farms/hooks/useUnstakeFarms'
import WithdrawModal from '../Modals/WithdrawModal'

export const InfoRow = styled.div<{ withBg?: boolean }>`
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  ${(props) => props.withBg && 'background: #f4f5fa;'}
`

export const InfoTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #8990a5;

  & > a {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
    border-bottom: 1px solid #6c5dd3;
    padding-bottom: 4px;
  }
`

export const EarnsFarm = styled.div<{ earningsBusdExist: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .balance {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    letter-spacing: 1px;
    color: #8990a5;
    margin-left: 4px;
  }
  .earned-token,
  .staked-token {
    color: ${(props) => (props.earningsBusdExist ? '#6C5DD3' : '#8990a5')};
  }
`

export const InfoValue = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #0b1359;
`

const StakeCounter = styled(IconButton)`
  svg {
    path {
      fill: #8990a5;
    }
  }
  background: transparent;
  border: 1px solid #d2d6e5;

  &:hover {
    opacity: 0.75;
    border: 1px solid #d2d6e5 !important;
    background-color: transparent !important;
  }
`

const HarvestButton = styled(Button)`
  width: 81px;
  height: 32px;
  font-size: 12px;
`

export interface InfoAPRProps {
  farm: FarmWithStakedValue
}

export function InfoApr({ farm }: InfoAPRProps) {
  const loading = useFarmsLoading()
  return (
    <>
      <InfoTitle>
        APR
        <InfoApr.Question />
      </InfoTitle>
      <InfoValue>{!loading ? `${farm.apr || 0}%` : <Skeleton width='75px' />}</InfoValue>
    </>
  )
}

InfoApr.Question = styled(QuestionHelper).attrs({
  text: 'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
})`
  vertical-align: middle;
`

export interface InfoEarnProps {
  farm: FarmWithStakedValue
}

export function InfoEarn({ farm }: InfoEarnProps) {
  const { t } = useTranslation()
  return (
    <>
      <InfoTitle>Earn</InfoTitle>
      <InfoValue>{farm.dual ? farm.dual.earnLabel : t('ALM + Fees')}</InfoValue>
    </>
  )
}

export function useFarmLpLabel(farm: FarmWithStakedValue) {
  return farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')
}

export function useFarmEarnings(farm: FarmWithStakedValue) {
  const { earnings: earningsAsString = 0 } = farm.userData || {}
  return new BigNumber(earningsAsString)
}

export function useInfoEarned(farm: FarmWithStakedValue) {
  const earnings = useFarmEarnings(farm)
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(farm.pid)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const almPrice = usePriceCakeBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(almPrice).toNumber() : 0

  const loading = useFarmsLoading()

  return {
    earnings,
    rawEarningsBalance,
    displayBalance,
    earningsBusd,
    titleNode: 'ALM earned',
    displayBalanceNode: loading ? (
      <Skeleton width='50px' />
    ) : (
      <div color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'} className='earned-token'>
        {displayBalance}
      </div>
    ),
    earningsBusdNode:
      earningsBusd > 0 ? (
        <Balance before='~' fontSize='12px' color='textSubtle' decimals={2} value={earningsBusd} unit=' USD' />
      ) : null,
    harvestButtonNode: (
      <HarvestButton
        disabled={rawEarningsBalance.eq(0) || pendingTx || loading}
        variant='secondary'
        onClick={async () => {
          setPendingTx(true)
          try {
            await onReward()
            toastSuccess(
              `${t('Harvested')}!`,
              t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' }),
            )
          } catch (e) {
            toastError(
              t('Error'),
              t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            )
            console.error(e)
          } finally {
            setPendingTx(false)
          }
          await farmUserDataUpdate(account, [farm.pid])
        }}
      >
        {t('Harvest')}
      </HarvestButton>
    ),
  }
}

export interface InfoDepositProps {
  farm: FarmWithStakedValue
}

export function InfoDeposit({ farm }: InfoDepositProps) {
  return (
    <>
      <InfoTitle>Deposit:</InfoTitle>
      <InfoValue>{useFarmLpLabel(farm)}</InfoValue>
    </>
  )
}

export function InfoDepositFee({ depositFee }: { depositFee: number }) {
  const loading = useFarmsLoading()
  return (
    <>
      <InfoTitle>Deposit fee</InfoTitle>
      <InfoValue>{!loading ? `${depositFee || 0}%` : <Skeleton width={75} height={25} />}</InfoValue>
    </>
  )
}

export function InfoLpType() {
  return (
    <>
      <InfoTitle>LP Type</InfoTitle>
      <InfoValue>Alium LP</InfoValue>
    </>
  )
}

export function useFarmLpAddress(farm: FarmWithStakedValue) {
  return getAddress(farm.lpAddresses)
}

export interface InfoViewBscScanProps {
  farm: FarmWithStakedValue
}

export function InfoViewBscScan({ farm }: InfoViewBscScanProps) {
  const address = useFarmLpAddress(farm)
  const loading = useFarmsLoading()
  if (loading) {
    return <Skeleton width={75} height={25} />
  }
  return (
    <InfoTitle>
      <a href={getExplorerLink(97, address, 'address')} target='_blank'>
        View on BacScan
      </a>
    </InfoTitle>
  )
}

export interface InfoTotalLiquidityProps {
  farm: FarmWithStakedValue
}

export function InfoTotalLiquidity({ farm }: InfoTotalLiquidityProps) {
  const loading = useFarmsLoading()
  const totalLiqudidty = farm.liquidity?.gt(0) ? `$${farm.liquidity.toNumber()}` : '0$'
  return (
    <>
      <InfoTitle>Total Liquidity</InfoTitle>
      <InfoValue>{!loading ? <p>{totalLiqudidty}</p> : <Skeleton width={75} height={25} />}</InfoValue>
    </>
  )
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

export interface UseInfoStakedParams {
  farm: FarmWithStakedValue
  addLiquidityUrl: string
}

export function useInfoStaked({ farm, addLiquidityUrl }: UseInfoStakedParams) {
  const loading = useFarmsLoading()

  const {
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    allowance: allowanceAsString = 0,
  } = farm.userData || {}
  const pid = farm.pid
  const tokenName = farm.lpSymbol
  const multiplier = farm.multiplier
  const apr = farm.apr
  const displayApr = `${apr}`

  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = useMemo(() => new BigNumber(stakedBalanceAsString), [stakedBalanceAsString])
  const stakedBalanceNotZero = !stakedBalance.eq(0)

  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useRouter()
  const { account } = useWeb3React()
  // todo provide lp price here
  const lpPrice = useLpTokenPrice(tokenName)
  const lpLabel = useFarmLpLabel(farm)
  const almPrice = usePriceCakeBusd()

  const handleStake = async (amount: string) => {
    await onStake(amount)
    await farmUserDataUpdate(account, [pid])
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    await farmUserDataUpdate(account, [pid])
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return '<0.0000001'
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN)
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      apr={apr}
      farm={farm}
      almPrice={almPrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal farm={farm} max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { lpAddresses } = farm
  const allowance = new BigNumber(allowanceAsString)

  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useTokenContract(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      await farmUserDataUpdate(account, [pid])
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account, pid])

  const FARM_NOT_ENABLED = account && !isApproved
  const STAKE_ALLOW = isApproved && !stakedBalanceNotZero
  const EMPTY_STAKE_ACTION = !FARM_NOT_ENABLED && !STAKE_ALLOW
 
  return {
    titleNode: `${tokenName} Staked`,
    displayBalanceNode: loading ? <Skeleton width='50px' /> : <div className='staked-token'>{displayBalance()}</div>,
    balanceNode: stakedBalance.gt(0) && lpPrice.gt(0) && (
      <Balance
        before='~'
        fontSize='12px'
        color='textSubtle'
        decimals={2}
        value={getBalanceNumber(lpPrice.times(stakedBalance))}
        unit=' USD'
      />
    ),
    stakedBalanceNotZero,
    stakingButtonsNode: stakedBalanceNotZero ? (
      <IconButtonWrapper>
        <StakeCounter variant='tertiary' onClick={onPresentWithdraw} mr='6px'>
          <MinusIcon color='primary' width='14px' />
        </StakeCounter>
        <StakeCounter
          variant='tertiary'
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIcon color='primary' width='14px' />
        </StakeCounter>
      </IconButtonWrapper>
    ) : (
      <div>-</div>
    ),
    actionsNode: EMPTY_STAKE_ACTION ? null : !account ? (
      <ConnectWalletButton />
    ) : (
      <>
        {FARM_NOT_ENABLED && (
          <Button mt='8px' disabled={requestedApproval} onClick={handleApprove}>
            {t('Enable Farm')}
          </Button>
        )}
        {STAKE_ALLOW && (
          <Button
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            {t('Stake LP')}
          </Button>
        )}
      </>
    ),
    onPresentDeposit,
  }
}
