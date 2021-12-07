import { ReactNode } from 'react'
import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import breakpoints from '../breakpoints'
import * as mq from '../mq'
import * as typography from '../typography'

// TODO: loading

export interface ButtonProps extends inferStyledProps<typeof Button['Root']> {
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'default' | 'small'
  startIcon?: ReactNode
  endIcon?: ReactNode
  children?: ReactNode
}

export default function Button({
  variant = 'contained',
  size = 'default',
  startIcon,
  endIcon,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <Button.Root data-variant={variant} data-size={size} {...restProps}>
      {startIcon && <Button.StartIcon>{startIcon}</Button.StartIcon>}
      {children}
      {endIcon && <Button.EndIcon>{endIcon}</Button.EndIcon>}
    </Button.Root>
  )
}

Button.StartIcon = styled.div`
  margin-right: 16px;

  @media ${mq.down(breakpoints.sm)} {
    margin-right: 8px;
  }
`

Button.EndIcon = styled.div`
  margin-left: 16px;

  @media ${mq.down(breakpoints.sm)} {
    margin-left: 8px;
  }
`

Button.Root = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 6px;
  transition: 200ms ease-in-out;
  white-space: nowrap;
  ${typography.button.main}
  height: 48px;
  &[data-size='small'] {
    height: 32px;
    ${typography.button.small}
  }

  &:disabled {
    cursor: not-allowed;
  }

  padding: 0 24px;

  &[data-size='small'] {
    padding: 0 16px;
  }

  &[data-variant='contained'] {
    background: #6c5dd3;
    color: #ffffff;

    &:hover {
      background: #8677f0;
    }

    &:active {
      background: #5849bd;
    }

    &:disabled {
      background: #cbc8ee;
    }

    @media ${mq.down(breakpoints.sm)} {
      padding: 0 16px;
    }
  }

  &[data-variant='outlined'] {
    padding: 0 23px;
    border: 1px solid #6c5dd3;
    color: #6c5dd3;

    &[data-size='small'] {
      padding: 0 15px;
    }

    &:hover {
      background: #8677f0;
      border-color: #8677f0;
      color: #ffffff;
    }

    &:active {
      background: #5849bd;
      border-color: #5849bd;
    }

    &:disabled {
      color: #cbc8ee;
      border-color: #cbc8ee;
    }

    @media ${mq.down(breakpoints.sm)} {
      padding: 0 15px;
    }
  }

  &[data-variant='text'] {
    color: #8990a5;
  }
`
