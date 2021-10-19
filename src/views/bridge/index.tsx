import { BridgeProvider } from 'contexts/BridgeContext'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import styled from 'styled-components'
import BridgeContainer from './BridgeContainer'
import BridgeCard from './components/BridgeCard'
import BridgeConnectWallet from './components/BridgeConnectWallet'
import PopupsBridge from './components/Popups'

export const BridgeWrapper: FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { t } = useTranslation()

  return (
    <BridgeProvider>
      <PopupsBridge />
      <BridgeContainer className={className || ''}>
        <H2>{t('Bridge')}</H2>
        <Card>
          <BridgeConnectWallet>{children}</BridgeConnectWallet>
        </Card>
      </BridgeContainer>
    </BridgeProvider>
  )
}

const Bridge = () => {
  return (
    <BridgeWrapper>
      <BridgeCard />
    </BridgeWrapper>
  )
}

export default Bridge

// styles

const H2 = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-bottom: 24px;

  @media screen and (max-width: 500px) {
    font-size: 28px;
    line-height: 36px;
    text-align: center;
  }
`

const Card = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
`
