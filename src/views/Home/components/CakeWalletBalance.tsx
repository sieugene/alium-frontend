import { useWeb3React } from '@web3-react/core'
import { Text } from 'alium-uikit/src'
import { BigNumber } from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useTokenBalance from 'hooks/useTokenBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(usePriceCakeBusd()).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color='textDisabled' style={{ lineHeight: '1.5px', marginTop: '20px', marginBottom: '55px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(cakeBalance)} decimals={4} fontSize='40px' lineHeight='1.5' />
      <CardBusdValue value={busdBalance} />
    </>
  )
}

export default CakeWalletBalance
