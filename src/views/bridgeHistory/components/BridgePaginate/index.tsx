import React, { FC } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import styled from 'styled-components'
export interface PaginateProps {
  onPageChanged: (page: number) => void
  currentPage: number
  totalPages: number
}

const Pagination = styled.ul`
  padding-top: 24px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  li {
    list-style-type: none;
  }
`

const Control = styled.li`
  border: 1px solid #e9e9eb;
  box-sizing: border-box;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    stroke: #8990a5;
  }
  &:hover {
    opacity: 0.7;
  }
`

const Content = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.1px;

  color: #8990a5;
`

const BridgePaginate: FC<PaginateProps> = ({ currentPage, totalPages, onPageChanged }) => {
  const allowPrevious = currentPage !== 1
  // If the next button should be enabled
  const allowNext = currentPage !== totalPages
  // If we're on the first page
  const firstPage = currentPage === 1
  // If we're on the last page
  const finalPage = currentPage === totalPages
  // The index of the previous page
  const previousPage = currentPage - 1
  // The index of the next page
  const nextPage = currentPage + 1

  return (
    <Pagination>
      <Control onClick={() => allowPrevious && onPageChanged(previousPage)}>
        <ChevronLeft />
      </Control>
      <li>
        <Content>
          Page {currentPage} of {totalPages}
        </Content>
      </li>
      <Control onClick={() => allowNext && onPageChanged(nextPage)}>
        <ChevronRight />
      </Control>
    </Pagination>
  )
}
export default BridgePaginate
