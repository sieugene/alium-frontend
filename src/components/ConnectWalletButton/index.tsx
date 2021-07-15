import { AddIcon, Button, ButtonProps, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
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
  .icon {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .icon {
      border: 1.5px solid rgb(255, 255, 255);
      padding: 0 0 0.5px 0.5px;
      display: flex;
      border-radius: 6px;
      margin-right: 14px;
    }
  }
`

// @ts-ignore
interface props extends ButtonProps {
  alt?: boolean
  fullwidth?: boolean
}

const UnlockButton: FC<props> = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <StyledButtonUnlockWallet>
      <Button onClick={onPresentConnectModal} {...props}>
        {props.alt ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='icon'>
              <AddIcon color='#ffffff' />
            </div>
            Connect
          </div>
        ) : (
          <div>{t('unlockWallet')}</div>
        )}
      </Button>
    </StyledButtonUnlockWallet>
  )
}

export default UnlockButton
