import { Percent } from '@alium-official/sdk'
import { Button, InjectedModalProps, Modal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useToast } from 'state/hooks'
import styled from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import {
  useCurrentPoolId,
  useJoinPool,
  usePoolAccountUser,
  usePoolLocked,
  usePoolUsers,
  useRewardTokenAllowance,
  useRewardTokenBalance,
  useRewardTokenInfo,
  useTotalLocked,
} from 'views/StrongHoldersPool/hooks'
import Web3 from 'web3'
import PoolDetailsInfo from '../PoolDetailsInfo'

export type JoinPoolModalProps = InjectedModalProps

export default function JoinPoolModal({ onDismiss }: JoinPoolModalProps) {
  const { data: currentPoolId, mutate: mutateCurrentPoolId } = useCurrentPoolId()
  const { data: poolUsers, mutate: mutatePoolUsers } = usePoolUsers(currentPoolId)
  const { data: poolLocked, mutate: mutatePoolLocked } = usePoolLocked(currentPoolId)
  const { mutate: mutateTotalLocked } = useTotalLocked()
  const { approve, join } = useJoinPool()
  const [loading, setLoading] = useState(false)
  const { rewardTokenInfo, rewardTokenSymbol } = useRewardTokenInfo()
  const { data: rewardTokenAllowance, mutate: mutateRewardTokenAllowance } = useRewardTokenAllowance()
  const { data: balance, mutate: mutateBalance } = useRewardTokenBalance()
  const balanceNumber = useMemo(() => balance && getBalanceNumber(ethersToBigNumber(balance)), [balance])
  const [amount, setAmount] = useState('')
  const amountNumber = useMemo(() => Number(amount), [amount])
  const hasAmount = amountNumber > 0
  const amountWei = useMemo(() => hasAmount && Web3.utils.toWei(amountNumber.toString()), [amountNumber, hasAmount])
  const needApprove = useMemo(
    () => rewardTokenAllowance && amountWei && ethersToBigNumber(rewardTokenAllowance).minus(amountWei).lt(0),
    [amountWei, rewardTokenAllowance],
  )
  const isInsufficientFunds = amountNumber > balanceNumber
  const poolShare = useMemo(() => {
    if (poolLocked && amountWei) {
      return new Percent(amountWei.toString(), ethersToBigNumber(poolLocked).plus(amountWei).toString())
    }
    return new Percent('0')
  }, [amountWei, poolLocked])
  const accountUser = usePoolAccountUser(currentPoolId)
  const leftId = useMemo(() => {
    return accountUser?.leftId ? ethersToBigNumber(accountUser.leftId) : new BigNumber(poolUsers?.length || 0).plus(1)
  }, [accountUser?.leftId, poolUsers?.length])
  const { toastError, toastSuccess } = useToast()
  const { t } = useTranslation()
  const protectedSetAmount = useCallback(
    (value: string) => {
      if (loading) return
      setAmount(value)
    },
    [loading],
  )
  return (
    <Modal
      withoutContentWrapper
      hideCloseButton={loading}
      title={loading ? t('Loading...') : t('Add ALM’s to the pool')}
      onDismiss={onDismiss}
    >
      <JoinPoolModal.Content>
        <JoinPoolModal.Data>
          <CurrencyInputPanel
            disableCurrencySelect
            id='join-pool-modal-value'
            showMaxButton
            value={amount}
            onUserInput={protectedSetAmount}
            balance={formatNumber(balanceNumber, 2, 4)}
            onMax={() => protectedSetAmount(String(balanceNumber || 0))}
            currency={rewardTokenInfo}
            label={t('Amount')}
          />
          <JoinPoolModal.Actions>
            <Button
              onClick={async () => {
                try {
                  setLoading(true)
                  await approve(amountNumber)
                  await mutateRewardTokenAllowance()
                  toastSuccess(`${amountNumber} ${rewardTokenSymbol} ${t('approved')}`)
                } catch (error) {
                  console.error(error)
                  toastError(error.data?.message || error.message)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={!approve || loading || !hasAmount || isInsufficientFunds || !needApprove}
            >
              {t('Approve')}
            </Button>
            <Button
              onClick={async () => {
                try {
                  setLoading(true)
                  await join(amountNumber)
                  toastSuccess(`${amountNumber} ${rewardTokenSymbol} ${t('added to the pool')}`)
                  mutateBalance()
                  mutateRewardTokenAllowance()
                  // should refetch the current pool after joining
                  mutateCurrentPoolId()
                  mutatePoolUsers()
                  mutatePoolLocked()
                  mutateTotalLocked()
                  onDismiss()
                } catch (error) {
                  console.error(error)
                  toastError(error.data?.message || error.message)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={!join || loading || !hasAmount || isInsufficientFunds || needApprove}
            >
              {t('Join')}
            </Button>
          </JoinPoolModal.Actions>
        </JoinPoolModal.Data>
        <JoinPoolModal.Details>
          <PoolDetailsInfo poolShare={poolShare} leftId={leftId} />
        </JoinPoolModal.Details>
      </JoinPoolModal.Content>
    </Modal>
  )
}

JoinPoolModal.Content = styled.div`
  min-width: 450px;
  max-width: 100%;
`

JoinPoolModal.Data = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #e9eaeb;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 24px;
  }
`

JoinPoolModal.Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

JoinPoolModal.Details = styled.div`
  padding: 16px;
`
