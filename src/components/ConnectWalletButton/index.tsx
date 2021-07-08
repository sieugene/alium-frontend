import { Button, ButtonProps, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

const StyledButtonUnlockWallet = styled.div`
  > button {
    width: 147px;
    margin-top: 10px;
  }
  @media screen and (max-width: 376px) {
    > button {
      width: 100%;
    }
  }
`

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <StyledButtonUnlockWallet>
      <Button onClick={onPresentConnectModal} {...props}>
        {t('unlockWallet')}
      </Button>
    </StyledButtonUnlockWallet>
  )
}

export default UnlockButton
