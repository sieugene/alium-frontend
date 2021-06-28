/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ReactComponent as Close } from '/images/x.svg';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { fortmatic, injected, portis } from '../../connectors';
import { OVERLAY_READY } from '../../connectors/Fortmatic';
import { SUPPORTED_WALLETS } from '../../constants';
import usePrevious from '../../hooks/usePrevious';
import { useWalletModalOpen, useWalletModalToggle } from '../../state/application/hooks';
import AccountDetails from '../AccountDetails';
import Modal from '../Modal';
import { ExternalLink } from '../Shared';
import Option from './Option';
import PendingView from './PendingView';

const MetamaskIcon = '/images/metamask.png';

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.colors.textDisabled};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.colors.primary : 'inherit')};
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 1rem;
  }
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const Blurb = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 1rem;
    font-size: 12px;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`;

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();

  const previousAccount = usePrevious(account);

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  const { t } = useTranslation();
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const tryActivation = async (connector: AbstractConnector | undefined) => {
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    if (connector) {
      activate(connector, undefined, true).catch((err) => {
        if (err instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      });
    }
  };

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal();
    });
  }, [toggleWalletModal]);

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      if (isMobile) {
        // disable portis on mobile for now
        if (option.connector === portis) {
          return null;
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                if (option.connector !== connector && !option.href) {
                  tryActivation(option.connector);
                }
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={require(`/images/${option.iconName}`)}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color="#E8831D"
                header={t('installMetaMask')}
                subheader={null}
                link="https://metamask.io/"
                icon={MetamaskIcon}
              />
            );
          }
          return null; // dont want to return install twice
        }
        // don't return metamask if injected provider isn't metamask
        if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} // use option.descriptio to bring back multi-line
            icon={require(`/images/${option.iconName}`)}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            {error instanceof UnsupportedChainIdError ? t('wrongNetworkDetected') : t('errorConnecting')}
          </HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>
                {t('pleaseConnect')}
                <a href="https://docs.binance.org/smart-chain/wallet/metamask.html">{t('how')}?</a>
              </h5>
            ) : (
              t('errorConnectingRefreshPage')
            )}
          </ContentWrapper>
        </UpperSection>
      );
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      );
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              {t('back')}
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>{t('modalTitle')}</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>{t('newToBsc')}? &nbsp;</span>{' '}
              <ExternalLink href="https://docs.binance.org/smart-chain/wallet/metamask.html">
                {t('learnMoreAboutWallets')}
              </ExternalLink>
            </Blurb>
          )}
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  );
}
