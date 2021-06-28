import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import React from 'react';
import { RedirectPathToSwapOnly } from 'views/Swap/redirects';

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
});

const Send = () => {
  return (
    <WrapSwapComponent>
      <RedirectPathToSwapOnly />
    </WrapSwapComponent>
  );
};

export default Send;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
