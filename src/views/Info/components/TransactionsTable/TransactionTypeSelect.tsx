import { Button } from 'alium-uikit/src'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { TransactionType } from 'views/Info/utils/transactions'

export interface TransactionTypeSelectProps {
  options: Array<{ title: string; value: TransactionType }>
  value: TransactionType
  onChange?: (type: TransactionType) => any
}

export default function TransactionTypeSelect({ options, value, onChange }: TransactionTypeSelectProps) {
  const isMobile = useMedia(mq.down(breakpoints.sm))

  if (isMobile) {
    return (
      <TransactionTypeSelect.Select onChange={(e) => onChange?.(e.target.value as any)} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </TransactionTypeSelect.Select>
    )
  }

  return (
    <>
      {options.map((option) => (
        <TransactionTypeSelect.Button
          size='sm'
          data-active={option.value === value}
          onClick={() => onChange?.(option.value)}
          key={option.value}
        >
          {option.title}
        </TransactionTypeSelect.Button>
      ))}
    </>
  )
}

TransactionTypeSelect.Select = styled.select`
  ${typography.ultrasmall.regular}
  color: #8990A5;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  padding: 6px 8px;
  background: transparent;
  outline: none;
`

TransactionTypeSelect.Button = styled(Button)`
  padding: 0 10px;

  &&&[data-active='false'] {
    &,
    &:hover {
      background: none;
      color: #8990a5;
    }
  }
`
