import { Button, RotateIcon } from 'alium-uikit/src'
import Paginate, { PaginateProps } from 'components/Pagination'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'

const Container = styled.div``

const FarmFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pagination {
    width: fit-content;
    padding: 0;
  }
  margin-top: 32px;
  @media ${down(breakpoints.sm)} {
    flex-direction: column;
    .pagination {
      margin-top: 8px;
      max-width: 375px;
      width: 100%;
      justify-content: space-between;
    }
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
    max-width: 375px;
    width: 100%;
  }
`

export const FarmPaginate: FC<PaginateProps> = ({ ...paginate }) => {
  const isLastPage = paginate?.currentPage >= paginate?.totalPages

  const onMore = () => {
    if (!isLastPage) {
      paginate?.onPageChanged(paginate?.currentPage + 1)
    }
  }
  return (
    <Container>
      <FarmFooter>
        <ShowMore variant='secondary' onClick={onMore} disabled={isLastPage}>
          <RotateIcon />
          Show more
        </ShowMore>

        <Paginate {...paginate} />
      </FarmFooter>
    </Container>
  )
}
