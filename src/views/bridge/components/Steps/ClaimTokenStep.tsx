import { Button } from 'alium-uikit/src'
import { useBridgeContext } from 'contexts/BridgeContext'
import { useClaim } from 'hooks/bridge/useClaim'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useToast } from 'state/hooks'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'

interface ClaimLoadProps {
  loading: boolean
  children: React.ReactNode
}

const ClaimLoadWrap: FC<ClaimLoadProps> = ({ loading, children }) => {
  const loadingText = useStoreBridge((state) => state.transactionText)
  const { t } = useTranslation()

  return (
    <>
      {loading && (
        <ClaimWrap>
          <StyledLoader type='TailSpin' color='#6C5DD3' />
          <h2>{t('Claim pending...')}</h2>
          <p>{loadingText || t('2 minutes left')}</p>
        </ClaimWrap>
      )}
      <Shadow loading={loading}>{children}</Shadow>
    </>
  )
}

const ClaimTokenStep = () => {
  const txHash = useStoreBridge((state) => state.txHash)
  const [loading, setloading] = useState(false)
  const updateStepStatus = storeBridge.getState().updateStepStatus
  const changeStep = storeBridge.getState().changeStep
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const toNetwork = useStoreBridge((state) => state.toNetwork)
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)
  const transactionMessage = useStoreBridge((state) => state.transactionMessage)
  const { loading: loadingTransaction } = useBridgeContext()
  const { t } = useTranslation()

  const claim = useClaim()

  const { toastError } = useToast()

  const claimTokens = useCallback(async () => {
    if (!txHash || loading) return
    setloading(true)
    try {
      const tx = await claim(txHash, transactionMessage)
      await tx.wait()
      updateStepStatus(BRIDGE_STEPS.CLAIM_TOKEN, true)
      changeStep(BRIDGE_STEPS.SUCCESS)
    } catch (manualClaimError) {
      console.log(manualClaimError)
      if (manualClaimError?.message === 'Wrong network.') {
        toggleNetworks()
      } else {
        manualClaimError?.message && toastError(manualClaimError?.message)
      }
    } finally {
      setloading(false)
    }
  }, [txHash, loading, claim, toggleNetworks, transactionMessage])

  // If network changed
  React.useEffect(() => {
    if (currentChainId !== toNetwork) {
      updateStepStatus(BRIDGE_STEPS.SWITCH_NETWORK, false)
      changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
    }
  }, [currentChainId, toNetwork])

  return (
    <ClaimLoadWrap loading={loading || loadingTransaction}>
      <Wrapper>
        <p className='title'>{t('Very little left')}</p>
        <Button onClick={claimTokens} disabled={loading}>
          {t('Claim')}
        </Button>
      </Wrapper>
    </ClaimLoadWrap>
  )
}

export default ClaimTokenStep

// styles

const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    max-width: 350px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  button {
    margin-top: 24px;
  }

  input {
    &:active,
    &:focus {
      box-shadow: none !important;
    }
  }
`

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`

const ClaimWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }

  p {
    margin-top: 8px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

const Shadow = styled.div<{ loading: boolean }>`
  ${(props) => props.loading && 'display: none;'}
`
