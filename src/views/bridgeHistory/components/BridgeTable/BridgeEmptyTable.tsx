import { BridgeClockIcon } from 'images/bridge/BridgeClockIcon'
import styled from 'styled-components'

const Wrapped = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin-top: 8px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #8990a5;
  }
`

const Clock = styled.div`
  height: 80px;
  width: 80px;
  background: rgba(108, 93, 211, 0.1);
  border-radius: 50px;
  padding: 20px 20px 20px 16px;
  margin-bottom: 16px;
`

const BridgeEmptyTable = () => {
  return (
    <Wrapped>
      <Clock>
        <BridgeClockIcon />
      </Clock>

      <h2>No History</h2>
      <p>Make the first exchange</p>
    </Wrapped>
  )
}

export default BridgeEmptyTable
