import { Text as UIKitText } from 'alium-uikit/src'
import { AutoColumn, ColumnCenter } from 'components/Column'

export const NoLiquidity = () => {
  return (
    <ColumnCenter>
      <AutoColumn style={{ marginTop: '-15px', marginBottom: '10px' }}>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          You are the first liquidity provider.
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          The ratio of tokens you add will set the price of this pool.
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          Once you are happy with the rate click supply to review.
        </UIKitText>
      </AutoColumn>
    </ColumnCenter>
  )
}
