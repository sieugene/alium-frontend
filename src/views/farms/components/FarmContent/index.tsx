import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import FarmCard from '../FarmCard'
import FarmRow from '../FarmRow'

export interface FarmContentProps {
  viewMode: ViewMode
  farms: FarmWithStakedValue[]
  almBnbPrice: BigNumber
}

export default function FarmContent({ viewMode, farms, almBnbPrice }: FarmContentProps) {
  switch (viewMode) {
    case ViewMode.CARD:
      return (
        <FarmContent.Grid>
          {farms.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} almBnbPrice={almBnbPrice} />
          ))}
        </FarmContent.Grid>
      )
    case ViewMode.TABLE:
      return (
        <FarmContent.Table>
          <tbody>
            {farms.map((farm) => (
              <FarmRow key={farm.pid} farm={farm} almBnbPrice={almBnbPrice} />
            ))}
          </tbody>
        </FarmContent.Table>
      )
  }
}

FarmContent.Grid = styled.div`
  display: grid;
  column-gap: 16px;
  row-gap: 16px;
  grid-template-columns: repeat(1, max-content);
  justify-content: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, max-content);
    row-gap: 24px;
  }

  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(3, max-content);
    column-gap: 30px;
    row-gap: 30px;
  }
`

FarmContent.Table = styled.table`
  width: 100%;
`
