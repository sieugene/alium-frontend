import { Button, RotateIcon } from 'alium-uikit/src'
import Paginate, { PaginateProps } from 'components/Pagination'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import styled from 'styled-components'
import { ViewMode } from 'views/farms/farms.types'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import FarmContent from '../FarmContent'

const Grid = styled(FarmContent.Grid)`
  @media screen and (max-width: 768px) {
    column-gap: 0;
    row-gap: 0;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ShowMore = styled(Button)`
  svg {
    margin-right: 16px;
  }
  &:hover {
    svg {
      fill: transparent;
    }
  }
  &:disabled {
    svg {
      path {
        fill: #bdc2c4;
        stroke: #bdc2c4;
      }
    }
  }
  width: 167px;
  @media ${down(breakpoints.sm)} {
    width: 100%;
  }
`
const BLOCK_WIDTH = 354
const Block = styled.div`
  width: ${BLOCK_WIDTH}px;
  margin-top: 32px;
  @media ${down(breakpoints.sm)} {
    min-width: 320px;
    width: 100%;
  }
`

const LeftContent = styled(Block)``
const RightContent = styled(Block)`
  display: flex;
  justify-content: flex-end;
  .pagination {
    width: fit-content;
    padding: 0;
  }
  @media ${down(breakpoints.sm)} {
    flex-direction: column;
    .pagination {
      margin-top: 8px;
      max-width: none;
      width: 100%;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`
const CenterContent = styled(Block)`
  width: ${BLOCK_WIDTH * 2}px;
  @media ${down(breakpoints.xl)} {
    width: ${BLOCK_WIDTH}px;
  }
  @media ${down(breakpoints.lg)} {
    display: none;
  }
`

export const FarmPaginate: FC<PaginateProps & { viewMode: ViewMode; count: number }> = ({
  viewMode,
  count,
  ...paginate
}) => {
  const isLastPage = paginate?.currentPage >= paginate?.totalPages

  const onMore = () => {
    if (!isLastPage) {
      paginate?.onPageChanged(paginate?.currentPage + 1)
    }
  }
  const ViewType = viewMode === ViewMode.TABLE ? Flex : Grid
  if (!count) {
    return <> </>
  }
  return (
    <ViewType>
      <LeftContent>
        <ShowMore variant='secondary' onClick={onMore} disabled={isLastPage}>
          <RotateIcon />
          Show more
        </ShowMore>
      </LeftContent>
      <CenterContent />
      <RightContent>
        <Paginate {...paginate} />
      </RightContent>
    </ViewType>
  )
}
