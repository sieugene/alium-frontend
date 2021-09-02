import { Button } from 'alium-uikit/src'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const TableBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 300px;
  justify-content: space-around;
  margin: 10px;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin: 0 auto 0 auto;
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const FarmTable: React.FC = ({ children }) => {
  return (
    <Container>
      <TableContainer>
        <TableBody>{children}</TableBody>
        <ScrollButtonContainer>
          <Button variant='text'>{'To Top'}</Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
