import styled from 'styled-components'

const Wrapper = styled.div`
  background: #dfe4ff;
  border-radius: 6px;
  height: 360px;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`

const Labels = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  width: 320px;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 72px;
    letter-spacing: 0.3px;
    color: #0b1359;
    padding-bottom: 16px;
  }
  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const Backgrounds = styled.div`
  background-size: contain;
  background-image: url(/images/farms/banners/farm-banner.png);
  height: 360px;
  width: 100%;
  max-width: 830px;
  background-repeat: no-repeat;
  background-position: bottom right;
  position: absolute;
  right: 0;

  @media screen and (max-width: 1240px) {
    right: -10%;
  }
`

const FarmBanner = () => {
  return (
    <Wrapper>
      <Labels>
        <h1>Farms</h1>
        <h3>Stake LP tokens to earn</h3>
      </Labels>
      <Backgrounds />
    </Wrapper>
  )
}

export default FarmBanner
