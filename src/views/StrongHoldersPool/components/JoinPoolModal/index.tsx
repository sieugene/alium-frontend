import { Button, InjectedModalProps, Modal } from 'alium-uikit/src'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useToast } from 'state/hooks'
import styled from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import { useJoinPool, useRewardToken, useRewardTokenBalance } from 'views/StrongHoldersPool/hooks'
import PoolDetailsInfo from '../PoolDetailsInfo'

export interface JoinPoolModalProps extends InjectedModalProps {
  onJoin?: () => any
}

export default function JoinPoolModal({ onDismiss, onJoin }: JoinPoolModalProps) {
  const { approve, join } = useJoinPool()
  const [approved, setApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const { rewardToken } = useRewardToken()
  const { balance, refetch: refetchBalance } = useRewardTokenBalance()
  const balanceNumber = useMemo(() => balance && getBalanceNumber(ethersToBigNumber(balance)), [balance])
  const [amount, setAmount] = useState('')
  const amountNumber = useMemo(() => Number(amount), [amount])
  const { toastError, toastSuccess } = useToast()
  const { t } = useTranslation()
  const hasAmount = amountNumber > 0
  const protectedSetAmount = useCallback(
    (value: string) => {
      if (approved || loading) return
      setAmount(value)
    },
    [approved, loading],
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
            currency={rewardToken}
            label={t('Amount')}
          />
          <JoinPoolModal.Actions>
            <Button
              onClick={async () => {
                try {
                  setLoading(true)
                  await approve(amountNumber)
                  toastSuccess(`${amountNumber} ${rewardToken?.symbol} ${t('approved')}`)
                  setApproved(true)
                } catch (error) {
                  console.error(error)
                  toastError(error.message)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={!approve || loading || !hasAmount}
            >
              {t('Approve')}
            </Button>
            <Button
              onClick={async () => {
                try {
                  setLoading(true)
                  await join(amountNumber)
                  await refetchBalance?.()
                  toastSuccess(`${amountNumber} ${rewardToken?.symbol} ${t('added to the pool')}`)
                  setApproved(false)
                  onJoin?.()
                } catch (error) {
                  console.error(error)
                  toastError(error.message)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={!join || loading || !hasAmount || !approved}
            >
              {t('Join')}
            </Button>
          </JoinPoolModal.Actions>
        </JoinPoolModal.Data>
        <JoinPoolModal.Details>
          <PoolDetailsInfo />
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
