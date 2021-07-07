import React, { FC } from 'react'
import styled from 'styled-components'
import { AddIcon } from '../../components/Svg'

export const StyledButton = styled.div`
  width: 92px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  border-radius: 6px;
  margin-right: 6px;
  background: #6c5dd3;

  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #ffffff;

  &:hover {
    background: #8677f0;
  }

  &.logged-in {
    background: #ebedf9;
    color: #6c5dd3;
  }

  &.logged-in:hover {
    background: #6c5dd3;
    color: #ffffff;
  }

  @media screen and (min-width: 768px) {
    width: auto;
    padding: 0 24px;
    height: 48px;
  }

  .icon {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .icon {
      border: 1.5px solid rgb(255, 255, 255);
      padding: 0 0 0.5px 0.5px;
      display: flex;
      border-radius: 6px;
      margin-right: 14px;
    }
  }
`

interface props {
  isAccount: boolean
  accountEllipsis: string | null
  onClick: () => void
}

export const ConnectButton: FC<props> = ({ isAccount, accountEllipsis, onClick }) => {
  return (
    <StyledButton className={isAccount ? 'logged-in' : ''} onClick={onClick}>
      {!isAccount && (
        <div className='icon'>
          <AddIcon color='#ffffff' />
        </div>
      )}
      {isAccount ? accountEllipsis : 'Connect'}
    </StyledButton>
  )
}
