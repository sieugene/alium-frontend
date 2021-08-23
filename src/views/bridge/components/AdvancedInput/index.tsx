import { Input } from 'alium-uikit/src'
import { useBridgeContext } from 'contexts/BridgeContext'
import { utils } from 'ethers'
import { BridgeAdvancedMinus } from 'images/bridge/BridgeAdvancedMinus'
import { BridgeAdvancedPlus } from 'images/bridge/BridgeAdvancedPlus'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

const AdvanceWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    max-width: 340px;
  }
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

const StyledInput = styled(Input)<{ notValid: boolean }>`
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

  ${(props) => props.notValid && 'border: 1px solid #ff0000a1;'}

  margin-top: 8px;
  max-width: 340px;
  height: 48px;
  width: 340px;
  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: initial;
  }
`

const AdvancedInput: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showInput, setShowInput] = useState(false)
  const { receiver, setReceiver } = useBridgeContext()
  const [shadowInput, setshadowInput] = useState('')
  const [touched, setTouched] = useState(false)
  const valid = React.useMemo(() => utils.isAddress(shadowInput), [shadowInput])

  const updateInput = (value: string) => {
    setshadowInput(value)
    if (utils.isAddress(value)) {
      setReceiver(value)
    } else {
      setReceiver('')
    }
  }

  const clear = () => {
    if (!valid && receiver) {
      setReceiver('')
      setTouched(false)
    }
  }
  React.useEffect(() => {
    if (!showInput) {
      clear()
    }
  }, [showInput])
  return (
    <>
      {showInput && (
        <StyledInput
          placeholder='Recipient Address'
          value={shadowInput}
          onChange={({ target }) => {
            updateInput(target?.value)
          }}
          onFocus={(event) => {
            setTouched(true)
          }}
          notValid={touched && !valid}
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
