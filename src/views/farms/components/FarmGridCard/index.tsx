import styled from 'styled-components'

const FarmGridCard = styled.div`
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

export default FarmGridCard
