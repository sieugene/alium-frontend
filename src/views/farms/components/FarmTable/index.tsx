import { Button, ColumnType, useTable } from 'alium-uikit/src'
import React, { useRef } from 'react'
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

interface Props {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const FarmTable: React.FC<Props> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <Container>
      <TableContainer>
        <TableBody>
          {rows?.length &&
            rows.map((row) => {
              return (
                <div>
                  {' '}
                  <h2>test</h2>
                </div>
              )
            })}
        </TableBody>
        <ScrollButtonContainer>
          <Button variant='text' onClick={scrollToTop}>
            To Top
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
