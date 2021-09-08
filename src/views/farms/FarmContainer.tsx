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
  padding: 10px;

  @media screen and (min-width: 768px) {
    padding: 24px;
  }

  @media screen and (min-width: 1440px) {
    padding: 32px;
  }
`

const FarmContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <AppWrapper>
      <BodyWrapper className={className}>{children}</BodyWrapper>
    </AppWrapper>
  )
}

export default FarmContainer
