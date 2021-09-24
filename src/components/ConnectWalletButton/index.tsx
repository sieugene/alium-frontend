import { AddIcon, Button, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

const StyledButtonUnlockWallet = styled.div`
  button {
    width: 100%;
    margin-top: 10px;
  }

  .icon {
    border: 1.5px solid rgb(255, 255, 255);
    padding: 0 0 0.5px 0.5px;
    display: flex;
    border-radius: 6px;
    margin-right: 14px;
  }

  @media screen and (min-width: 768px) {
    button {
      width: 150px;
      padding: 0 13px;
    }

    .icon {
      border: 1.5px solid rgb(255, 255, 255);
      padding: 0 0 0.5px 0.5px;
      display: flex;
      border-radius: 6px;
      margin-right: 14px;
    }
  }
`

interface IUnlockButtonProps {
  alt?: boolean
  fullwidth?: boolean
  title?: string
}

const UnlockButton = ({ title, ...props }: IUnlockButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <StyledButtonUnlockWallet>
      <Button onClick={onPresentConnectModal} {...props}>
        {props.alt ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='icon'>
              <AddIcon color='#fff' />
            </div>
            Connect
          </div>
        ) : (
          <div>{title ? title : t('unlockWallet')}</div>
        )}
      </Button>
    </StyledButtonUnlockWallet>
  )
}

export default UnlockButton
