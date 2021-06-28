import { Button, useWalletModal } from 'alium-uikit/src';
import useAuth from 'hooks/useAuth';
import useI18n from 'hooks/useI18n';
import React from 'react';

const UnlockButton = (props) => {
  const TranslateString = useI18n();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  );
};

export default UnlockButton;
