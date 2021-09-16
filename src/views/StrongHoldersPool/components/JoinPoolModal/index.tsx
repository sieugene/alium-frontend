import { Button, InjectedModalProps, Modal } from 'alium-uikit/src'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { TEST_BSC_ALM } from 'constants/index'
import { useState } from 'react'
import styled from 'styled-components'
import PoolDetailsInfo from '../PoolDetailsInfo'

type JoinPoolModalProps = InjectedModalProps

export default function JoinPoolModal({ onDismiss }: JoinPoolModalProps) {
  const [value, setValue] = useState('')
  return (
    <Modal withoutContentWrapper title='Add ALM’s to the pool' onDismiss={onDismiss}>
      <JoinPoolModal.Content>
        <JoinPoolModal.Form onSubmit={(e) => e.preventDefault()}>
          <CurrencyInputPanel
            disableCurrencySelect
            id='join-pool-modal-value'
            showMaxButton
            value={value}
            onUserInput={setValue}
            balance='1000'
            currency={TEST_BSC_ALM}
            label='Amount'
          />
          <JoinPoolModal.FormActions>
            <Button>Approve</Button>
            <Button type='submit' disabled>
              Join
            </Button>
          </JoinPoolModal.FormActions>
        </JoinPoolModal.Form>
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

JoinPoolModal.Form = styled.form`
  padding: 24px 16px;
  border-bottom: 1px solid #e9eaeb;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 24px;
  }
`

JoinPoolModal.FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

JoinPoolModal.Details = styled.div`
  padding: 16px;
`
