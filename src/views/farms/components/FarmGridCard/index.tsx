import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}
const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(354px, 1fr));
  justify-items: center;
  grid-gap: 38px;
`
const FarmGridCard: FC<Props> = ({ children }) => {
  return <Grid>{children}</Grid>
}

export default FarmGridCard
