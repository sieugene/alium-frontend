import { Input } from 'alium-uikit/src'
import { BridgeAdvancedMinus } from 'images/bridge/BridgeAdvancedMinus'
import { BridgeAdvancedPlus } from 'images/bridge/BridgeAdvancedPlus'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

const AdvanceWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 258px;
`

const Advanced = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  width: fit-content;
  user-select: none;

  letter-spacing: 1px;
  color: #8990a5;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease;
  &:hover {
    opacity: 0.7;
  }
  svg {
    margin-left: 8px;
  }
`

const StyledInput = styled(Input)`
  &:focus {
    box-shadow: none !important;
  }
  &::placeholder {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #8990a5;
  }
  margin-top: 8px;
  max-width: 340px;
  height: 48px;
  width: 340px;
  @media screen and (max-width: 768px) {
    width: 258px;
    max-width: 258px;
  }
  @media screen and (max-width: 480px) {
    width: 183px;
    max-width: 183px;
  }
`

const AdvancedInput: FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = ''
  const [showInput, setShowInput] = useState(false)
  return (
    <>
      {showInput && (
        <StyledInput
          placeholder='Recipient Address'
          value={value}
          onChange={({ target }) => {
            // updateInput('advanced', target?.value)
          }}
        />
      )}
      <AdvanceWrapper>
        {children && children}
        <Advanced onClick={() => setShowInput(!showInput)}>
          Advanced
          {showInput ? <BridgeAdvancedMinus /> : <BridgeAdvancedPlus />}
        </Advanced>
      </AdvanceWrapper>
    </>
  )
}

export default AdvancedInput
