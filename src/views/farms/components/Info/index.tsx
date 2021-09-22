import { useWeb3React } from '@web3-react/core'
import { AddIcon, Button, CalculateIcon, IconButton, LinkIcon, MinusIcon, Skeleton, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import QuestionHelper from 'components/QuestionHelper'
import { useTokenContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import DepositModal from 'views/farms/components/Modals/DepositModal'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import useApproveFarm from 'views/farms/hooks/useApproveFarm'
import {
  farmUserDataUpdate,
  useFarmsLoading,
  useLpTokenPrice,
  usePriceAlmBusd,
} from 'views/farms/hooks/useFarmingPools'
import useHarvestFarm from 'views/farms/hooks/useHarvestFarm'
import useStakeFarms from 'views/farms/hooks/useStakeFarms'
import useUnstakeFarms from 'views/farms/hooks/useUnstakeFarms'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import RoiModal from '../Modals/RoiModal'
import WithdrawModal from '../Modals/WithdrawModal'

const StyledConnectBtn = styled(ConnectWalletButton)`
  max-width: 300px;
  width: auto !important;
`

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
  .earned-token {
    color: #6c5dd3;
  }
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

const StakeCounter = styled(IconButton)<{ viewMode: ViewMode }>`
  svg {
    path {
      fill: #8990a5;
    }
  }
  background: transparent;
  border: 1px solid #d2d6e5;
  height: 40px;
  width: 40px;
  @media ${down(breakpoints.sm)} {
    ${({ viewMode }) =>
      viewMode === ViewMode.TABLE &&
      `
      height: 28px;
      width: 28px;
    `}
  }

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
  almPrice: BigNumber
}

const AprItem = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`
const IconCalculateWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  cursor: pointer;
`
export function InfoApr({ farm, almPrice }: InfoAPRProps) {
  const loading = useFarmsLoading()
  const [onShowRoi] = useModal(<RoiModal almPrice={almPrice} farm={farm} />)
  return (
    <>
      <InfoTitle>
        APR
        <InfoApr.Question />
      </InfoTitle>
      <InfoValue>
        <AprItem>
          {!loading ? (
            <>
              <IconCalculateWrap onClick={onShowRoi}>
                <CalculateIcon />
              </IconCalculateWrap>
              {farm.apr || 0}%
            </>
          ) : (
            <Skeleton width='75px' />
          )}
        </AprItem>
      </InfoValue>
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
  const almPrice = usePriceAlmBusd()
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
            toastSuccess(`${t('Harvested')}!`, t('Your ALM earnings have been sent to your wallet!'))
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
const LpLink = styled(InfoValue)`
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  svg {
    margin-left: 8px;
  }
`

export function InfoDeposit({ farm }: InfoDepositProps) {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const address = getExplorerLink(97, farm.lpAddresses[currentChainId], 'address')
  return (
    <>
      <InfoTitle>Deposit:</InfoTitle>
      <LpLink>
        <a href={address} target='_blank'>
          {useFarmLpLabel(farm)} <LinkIcon />
        </a>
      </LpLink>
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
      <a href={getExplorerLink(97, address, 'address')} target='_blank' style={{ whiteSpace: 'nowrap' }}>
        View on BscScan
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
}

export function useInfoStaked({ farm }: UseInfoStakedParams) {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const loading = useFarmsLoading()
  const viewMode = useStoreFarms((state) => state.viewMode)

  const {
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    allowance: allowanceAsString = 0,
  } = farm.userData || {}

  const pid = farm.pid
  const tokenName = farm.lpSymbol
  const apr = farm.apr
  const { lpAddresses } = farm
  const allowance = new BigNumber(allowanceAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const tokenBalance = new BigNumber(tokenBalanceAsString)

  // hooks
  const lpContract = useTokenContract(lpAddress)
  const { onApprove } = useApproveFarm(lpContract)
  const stakedBalance = useMemo(() => new BigNumber(stakedBalanceAsString), [stakedBalanceAsString])
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useRouter()
  // TODO provide lp price here
  const lpPrice = useLpTokenPrice(tokenName)
  const almPrice = usePriceAlmBusd()

  const stakedBalanceNotZero = account ? !stakedBalance.eq(0) : false

  // conditions
  const FARM_NOT_ENABLED = account && !isApproved
  const STAKE_ALLOW = isApproved && !stakedBalanceNotZero
  const EMPTY_STAKE_ACTION = !FARM_NOT_ENABLED && !STAKE_ALLOW

  // handlers
  const handleStake = async (amount: string) => {
    await onStake(amount)
    await farmUserDataUpdate(account, [pid])
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    await farmUserDataUpdate(account, [pid])
  }

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

  const displayBalance = useCallback(() => {
    if (FARM_NOT_ENABLED) {
      return ''
    }
    if (!account) {
      return '0.000'
    }
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return '<0.0000001'
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN)
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [FARM_NOT_ENABLED, account, stakedBalance])

  return {
    titleNode: `${tokenName} Staked`,
    displayBalanceNode: FARM_NOT_ENABLED ? null : loading ? (
      <Skeleton width='50px' />
    ) : (
      <div className='staked-token'>{displayBalance()}</div>
    ),
    balanceNode: account && stakedBalance.gt(0) && lpPrice.gt(0) && (
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
    stakingButtonsNode:
      account && stakedBalanceNotZero ? (
        <IconButtonWrapper>
          <StakeCounter variant='tertiary' onClick={onPresentWithdraw} mr='6px' viewMode={viewMode}>
            <MinusIcon color='primary' />
          </StakeCounter>
          <StakeCounter
            viewMode={viewMode}
            variant='tertiary'
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            <AddIcon.Small color='primary' />
          </StakeCounter>
        </IconButtonWrapper>
      ) : (
        <div>-</div>
      ),
    actionsNode: !account ? (
      <StyledConnectBtn />
    ) : EMPTY_STAKE_ACTION ? null : (
      <>
        {FARM_NOT_ENABLED && (
          <Button mt='8px' disabled={requestedApproval || loading} onClick={handleApprove}>
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
