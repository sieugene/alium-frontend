import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import NumericInput from 'react-numeric-input'
import styled from 'styled-components'
import { numberAndDot } from 'utils/common/numberAndDot'
import { getBoxShadow, getHeight, StyledInputProps } from '../Input/Input'
import { scales } from '../Input/types'
import style from './Numeric.module.scss'

export const NumericStyled = styled(NumericInput)`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px !important;
  /* height: ${getHeight}; */
  outline: 0;
  padding: 0 16px !important;
  width: 100%;
  height: inherit !important;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

const Numeric: FC<StyledInputProps> = ({ ...other }) => {
  const change = (eventOrValue, sssss, current) => {
    const value = eventOrValue?.target ? eventOrValue?.target?.value : eventOrValue
    if (!numberAndDot(value)) {
      eventOrValue?.currentTarget?.blur()
    }

    if (eventOrValue?.target) {
      other?.onChange(eventOrValue)
    } else {
      // mocked event
      const event = {
        target: {
          value: eventOrValue,
        },
      }
      // @ts-ignore
      other?.onChange(event)
    }
  }
  return (
    <div style={other?.style ? { ...other?.style } : {}} className={`${style.numeric} ${!isMobile && style.controls}`}>
      <NumericStyled
        className='form-control'
        {...other}
        onChange={change}
        onKeyDown={change}
        onKeyPress={change}
        onKeyUp={change}
      />
    </div>
  )
}
Numeric.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
}

export default Numeric
