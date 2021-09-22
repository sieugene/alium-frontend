import { ChevronDownIcon, ChevronUpIcon } from 'alium-uikit/src'
import { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

export interface DetailsButtonProps extends ComponentPropsWithoutRef<'button'> {
  isOpen?: boolean
}

export default function DetailsButton({ isOpen, ...restProps }: DetailsButtonProps) {
  return (
    <DetailsButton.Root type='button' {...restProps}>
      {isOpen ? 'Hide' : 'Details'}
      {isOpen ? <ChevronUpIcon color='currentColor' /> : <ChevronDownIcon color='currentColor' />}
    </DetailsButton.Root>
  )
}

DetailsButton.Root = styled.button`
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #8990a5;
  cursor: pointer;
  padding: 0;
  outline: none;

  svg {
    margin-left: 4px;
  }
`
