import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import React from 'react';

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
});

const PoolFinder = dynamic(() => import('views/PoolFinder'), { ssr: false });

const Find = () => {
  return (
    <WrapSwapComponent>
      <PoolFinder />
    </WrapSwapComponent>
  );
};

export default Find;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
