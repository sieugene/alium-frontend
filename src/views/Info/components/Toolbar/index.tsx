import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { ReactComponent as BookmarkIcon } from './assets/bookmark.svg'
import { ReactComponent as SearchIcon } from './assets/search.svg'

export interface ToolbarProps {
  title: ReactNode
}

export default function Toolbar({ title }: ToolbarProps) {
  return (
    <Toolbar.Root>
      <Toolbar.Title>{title}</Toolbar.Title>
      <Toolbar.Actions>
        <Toolbar.Action>
          <SearchIcon />
        </Toolbar.Action>
        <Toolbar.Action>
          <BookmarkIcon />
        </Toolbar.Action>
      </Toolbar.Actions>
    </Toolbar.Root>
  )
}

Toolbar.Action = styled.button`
  padding: 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:nth-of-type(1) {
    background: #e6e6f6;
  }
`

Toolbar.Actions = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 16px;
  }
`

Toolbar.Title = styled.div`
  ${typography.h2}
  color: #0B1359;
`

Toolbar.Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${mq.down(breakpoints.md)} {
    ${Toolbar.Title} {
      ${typography.h4}
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${Toolbar.Title} {
      ${typography.h5}
    }
  }
`
