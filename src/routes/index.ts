import { getMainDomain } from '@alium-official/uikit'

export const ROUTES = {
  home: '/',
  // SWAP
  exchange: '/swap',
  pool: '/pool',
  add: '/add',
  addWithCurrencyA: '/add/:currencyIdA',
  addWithMultipleCurrency: '/add/:currencyIdA/:currencyIdB',
  removeTokens: '/remove/:tokens',
  removeMultiple: '/remove/:currencyIdA/:currencyIdB',
  addByOne: (currencyId) => `/add/${currencyId}`,
  addByMultiple: (currencyIdA: string, currencyIdB: string) => `/add/${currencyIdA}/${currencyIdB}`,
  removeByMultiple: (currencyIdA: string, currencyIdB: string) => `/remove/${currencyIdA}/${currencyIdB}`,
  //
  tokenHolderArea: '/account',
  collection: '/collection',
  audits: '/audits',
  public: `https://public.${getMainDomain()}`,
  profile: `https://${getMainDomain()}/profile`,
  overview: `https://info.${getMainDomain()}`,
  tokens: `https://info.${getMainDomain()}/tokens`,
  pairs: `https://info.${getMainDomain()}/pairs`,
}
