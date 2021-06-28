import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import React from 'react';

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
});

const RedirectDuplicateTokenIds = dynamic(
  () => import('views/AddLiquidity/redirects').then((module) => module.RedirectDuplicateTokenIds),
  {
    ssr: false,
  },
);

const SwapAddMultipleCurrency = () => {
  return (
    <WrapSwapComponent>
      <RedirectDuplicateTokenIds />
    </WrapSwapComponent>
  );
};

export default SwapAddMultipleCurrency;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
