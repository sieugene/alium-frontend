import { ButtonMenu, ButtonMenuItem, Flex, Heading } from 'alium-uikit/src';
import { NextLink } from 'components/NextLink';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from 'routes';
import styled from 'styled-components';

const StyledNav = styled.div`
  margin-bottom: 32px;
  > h1 {
    margin-bottom: 16px;
    margin-top: 0;
    font-size: 48px;
  }
  > div {
    padding: 8px;
  }
  > div > a {
    height: 40px;
    width: 140px;
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    > h1 {
      font-size: 32px;
      margin-top: 0;
    }
  }
  @media screen and (max-width: 376px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
    > h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    > div {
      align-self: center;
    }
  }
`;

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex alignItems="flex-start">
      <StyledNav>
        <Heading as="h1" size="xl" color="heading" mb="40px" mt="20px">
          {t('mainMenu.trade')}
        </Heading>
        <ButtonMenu size="md" variant="primary" activeIndex={activeIndex}>
          <ButtonMenuItem id="swap-nav-link">
            <NextLink href={ROUTES.exchange}>{t('swap')}</NextLink>
          </ButtonMenuItem>
          <ButtonMenuItem id="pool-nav-link">
            <NextLink href={ROUTES.pool}>{t('mainMenu.liquidity')}</NextLink>
          </ButtonMenuItem>

          {/* <ButtonMenuItem id="migrate-nav-link" to="/migrate" as={Link}>
          Migrate
        </ButtonMenuItem> */}
        </ButtonMenu>
      </StyledNav>
    </Flex>
  );
};

export default Nav;
