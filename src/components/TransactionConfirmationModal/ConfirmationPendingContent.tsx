import { Spinner, Text } from 'alium-uikit/src'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import { ConfirmedIcon, ContentHeader, Section, Wrapper } from './helpers'

const Circle = '/images/blue-loader.svg'

interface ConfirmationPendingContentProps {
  onDismiss: () => void
  pendingText: string
}

const CustomLightSpinner = styled<any>(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const ConfirmationPendingContent = ({ onDismiss, pendingText }: ConfirmationPendingContentProps) => {
  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Waiting for confirmation</ContentHeader>
        <ConfirmedIcon>
          <CustomLightSpinner src={Circle} alt='loader' size='90px' />
        </ConfirmedIcon>
        <AutoColumn gap='12px' justify='center'>
          <AutoColumn gap='12px' justify='center'>
            <Text fontSize='14px'>
              <strong>{pendingText}</strong>
            </Text>
          </AutoColumn>
          <Text fontSize='14px'>Confirm this transaction in your wallet</Text>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
