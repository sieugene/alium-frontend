const backgroundImage = '/images/trade-background.svg'
import { FARM_MOBILE_MEDIA } from 'constants/layout/farm.layout'
import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  min-height: 100vh;

  padding: 32px 6.6% 32px 6.6%;

  @media screen and (max-width: 1440px) {
    padding: 32px 30px 32px 30px;
  }
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    padding: 32px 10px 32px 10px;
  }

  /* @media screen and (max-width: 1024px) {
    padding: 32px 25px 25px 25px;
  }

  @media screen and (max-width: 768px) {
    padding: 32px 24px;
  }
  @media screen and (max-width: 500px) {
    //139
    padding: 32px 10px 10px 10px;
    background-position: right top;
    background-size: 156%;
  } */
`

const FarmContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <>
      <AppWrapper>
        <BodyWrapper className={className || ''}>{children}</BodyWrapper>
      </AppWrapper>
    </>
  )
}

export default FarmContainer
