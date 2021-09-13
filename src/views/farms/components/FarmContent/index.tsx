import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import { farmBgForNthChild, farmCardsBg } from 'views/farms/helpers/farms.styles'
import FarmCard from '../FarmCard'
import FarmRow from '../FarmRow'

export interface FarmContentProps {
  viewMode: ViewMode
  farms: FarmWithStakedValue[]
  almPrice: BigNumber
}

export default function FarmContent({ viewMode, farms, almPrice }: FarmContentProps) {
  switch (viewMode) {
    case ViewMode.CARD:
      return (
        <FarmContent.Grid>
          {farms.map((farm) => (
            <FarmCard key={farm.pid} farm={farm} almPrice={almPrice} />
          ))}
        </FarmContent.Grid>
      )
    case ViewMode.TABLE:
      return (
        <FarmContent.Table>
          <tbody>
            {farms.map((farm) => (
              <FarmRow key={farm.pid} farm={farm} almPrice={almPrice} />
            ))}
          </tbody>
        </FarmContent.Table>
      )
  }
}

FarmContent.Container = styled.div`
  .farm__row,
  .farm__card {
    .farm__head {
      background-size: contain;
      ${farmCardsBg[0]}
      background-repeat: no-repeat;
    }
  }
  .farm__card {
    ${farmBgForNthChild(1)};
    ${farmBgForNthChild(2)};
    ${farmBgForNthChild(3)};
  }
  .farm__row {
    ${farmBgForNthChild(1, 1)};
    ${farmBgForNthChild(3, 2)};
    ${farmBgForNthChild(5, 3)};
  }
`

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
