import { Text as UIKitText } from 'alium-uikit/src'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { useTranslation } from 'next-i18next'

export const NoLiquidity = () => {
  const { t } = useTranslation()

  return (
    <ColumnCenter>
      <AutoColumn style={{ marginTop: '-15px', marginBottom: '10px' }}>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('liquidity.youAreTheFirstLiquidity')}
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('liquidity.theRatioOfTokens')}
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('liquidity.onceYouAreHappy')}
        </UIKitText>
      </AutoColumn>
    </ColumnCenter>
  )
}
