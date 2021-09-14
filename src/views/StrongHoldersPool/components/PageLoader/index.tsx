import Loader from 'components/Loader'
import styled from 'styled-components'

const PageLoader = styled.div.attrs({
  children: <Loader size='48px' />,
})`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export default PageLoader
