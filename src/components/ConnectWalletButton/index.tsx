import { Button, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { ReactComponent as AddIcon } from './assets/Plus.svg'

const StyledButtonUnlockWallet = styled.div`
  button {
    width: 100%;
    margin-top: 10px;
  }

  .icon {
    margin-right: 18px;
  }

  @media screen and (min-width: 768px) {
    button {
      width: 150px;
      padding: 0 13px;
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
