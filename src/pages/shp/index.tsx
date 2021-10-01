import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// export { default } from 'views/StrongHoldersPool'
export default function () {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
