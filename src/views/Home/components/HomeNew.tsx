import { useModal } from 'alium-uikit/src'
import { motion } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'
import styled from 'styled-components'
import { dbMailListCreateEmail } from 'utils/firebase'
import CongratsModal from 'views/Home/components/CongratsModal'

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  max-width: 1122px;
  width: 100%;
  margin: 0 auto 80px auto;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 0 auto;
  }
`

const Container2 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  max-width: 1122px;
  background: url(/images/home-new/Slider0.png) no-repeat;
  background-size: contain;
  width: 100%;
  margin: 0 auto 80px auto;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 0 auto;
  }
`

const Container3 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  max-width: 1122px;
  background: url(/images/home-new/app-image.png) no-repeat;
  background-size: contain;
  width: 100%;
  margin: 0 auto 80px auto;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 0 auto;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 546px;
  width: 100%;
  /* margin: 147px auto 0 auto; */
  margin-top: 17px;
  /* @media screen and (min-width: 1320px) {
    margin: 0;
  } */
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 0 auto;
  }
`

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 430px;
  height: 502px;
  padding-top: 102px;
  padding-left: 0;
  position: relative;
  margin: auto;
  zoom: 0.6;
  @media screen and (min-width: 640px) {
    zoom: 1;
    margin: 0;
    padding: 0;
  }
  @media screen and (min-width: 1320px) {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    zoom: inherit;
    margin: 0;
    padding: 0;
    height: 300px;
  }
  @media screen and (max-width: 414px) {
    zoom: 0.8;
  }
`

const StartingSoon = styled.div`
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(155, 44%, 81%);
  border: 1px solid hsl(155, 68%, 44%);
  border-radius: 6px;
  width: 101px;
  height: 30px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(155, 68%, 44%);
  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`

const H1 = styled.h1`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  letter-spacing: 0.3px;
  margin-top: 32px;
  color: #0b1359;
  span {
    margin-left: 8px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 40px;
    line-height: 48px;
    span {
      display: block;
      margin-left: 0;
    }
  }
  @media screen and (max-width: 768px) {
    line-height: 40px;
    margin-top: 16px;
    padding-right: 24px;
    padding-left: 24px;
    span {
      display: inline-block;
      margin-left: 8px;
    }
  }
  @media screen and (max-width: 414px) {
    padding-right: 16px;
    padding-left: 16px;
    font-size: 32px;
  }
  @media screen and (max-width: 350px) {
    font-size: 30px;
  }
  & .title {
    text-align: center;
    width: 300px;
    color: #ffffff;
  }
`

const H2 = styled.h2`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #8990a5;
  margin-top: 32px;
  @media screen and (max-width: 1024px) {
    max-width: 278px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 16px;
    text-align: center;
  }
  @media screen and (max-width: 414px) {
    text-align: center;
  }
`

const ActionButton = styled.div`
  margin-top: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 48px;
  background: hsl(248, 57%, 60%);
  border-radius: 6px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: hsla(248, 57%, 65%);
  }
  @media screen and (max-width: 414px) {
    margin-left: 0;
  }
`

const Cards = styled.div`
  max-width: 1122px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    padding-right: 24px;
    padding-left: 24px;
    max-width: none;
    a {
      width: 49%;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 24px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
      width: 100%;
    }
  }
  @media screen and (max-width: 576px) {
    padding-right: 16px;
    padding-left: 16px;
  }
  @media screen and (max-width: 414px) {
    max-width: none;
    a {
      width: 100%;
    }
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 258px;
  height: 144px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 5px;
  @media screen and (max-width: 414px) {
    width: 100%;
    height: 80px;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .title {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 8px 0 0 16px;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

const CardFarming = styled(Card)`
  background: url('/images/home-new/farming.svg');
  background-repeat: no-repeat;
  background-position: center;
`
const CardCross = styled(Card)`
  background: url('/images/home-new/cross.svg');
  background-repeat: no-repeat;
  background-position: center;
`

const CardAvalanche = styled(Card)`
  background: url('/images/home-new/avalanche.svg');
  background-repeat: no-repeat;
  background-position: center;
`

const MarketPlace = styled.div`
  background: url(/images/home-new/alm-left.png) no-repeat;
  background-size: contain;
  max-width: 555px;
  width: 100%;
  height: 555px;
  @media screen and (max-width: 414px) {
    background-size: cover;
  }
`

const MotionLeftColumn: FC<{
  opacityDelay?: number
  opacityDuration?: number
  xInitial?: number
  xDuration?: number
}> = ({ children, opacityDelay = 0, opacityDuration = 1.5, xInitial = 0, xDuration = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: opacityDelay, duration: opacityDuration, ease: 'easeOut' }}
  >
    <motion.div initial={{ x: xInitial }} animate={{ x: 0 }} transition={{ duration: xDuration, ease: 'easeOut' }}>
      {children}
    </motion.div>
  </motion.div>
)

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const HomeNew = () => {
  const [hideLabel, setHideLabel] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCloseModal = () => {
    closeModal()
  }

  const [openModal, closeModal] = useModal(<CongratsModal handleClose={handleCloseModal} />)

  const handleChangeEmail = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    setEmailError(null)
  }

  const handleSubmitEmail = async () => {
    if (validateEmail(email)) {
      setIsLoading(true)
      const res = await dbMailListCreateEmail(email)
      if (res === true) {
        setEmail('')
        setEmailError(null)
        openModal()
      } else if (res === false) {
        setEmailError('Your email has already been added!')
      } else {
        setEmailError('Unknown error. Please contact support.')
      }
      setIsLoading(false)
    } else {
      setEmailError('Please enter a valid email address')
    }
  }

  return (
    <>
      <Container2>
        <LeftColumn>
          {/* <MotionLeftColumn xInitial={-20} xDuration={0.8}>
            <StartingSoon>15.06.2021</StartingSoon>
          </MotionLeftColumn> */}
          <MotionLeftColumn xInitial={-60} xDuration={1}></MotionLeftColumn>
          <MotionLeftColumn xInitial={-40} xDuration={0.8}></MotionLeftColumn>
          <MotionLeftColumn xInitial={-50} xDuration={1.1}>
            {/* <EmailContainer>
              <InputStyled>
                {!hideLabel && <label>Your email</label>}
                <Input
                  isWarning={!!emailError}
                  scale="lg"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={handleChangeEmail}
                  onBlur={() => setHideLabel(false)}
                  onFocus={() => setHideLabel(true)}
                  type="email"
                  name="email"
                />
                {emailError && <InputErrorStyled>{emailError}</InputErrorStyled>}
              </InputStyled>
              <ActionButton onClick={handleSubmitEmail}>{isLoading ? <StyledLoader /> : 'Send'}</ActionButton>
            </EmailContainer> */}
          </MotionLeftColumn>
        </LeftColumn>
        <RightColumn></RightColumn>
      </Container2>
      <H1>Road Map</H1>
      <Container>
        <Cards>
          <CardContainer>
            <CardFarming></CardFarming>
            <div className='title'>Farming Launch</div>
          </CardContainer>
          <CardContainer>
            <CardCross></CardCross>
            <div className='title'>Cross-blockhain Swaps </div>
          </CardContainer>
          <CardContainer>
            <CardAvalanche></CardAvalanche>
            <div className='title'>Avalanche & Solana Integration</div>
          </CardContainer>
        </Cards>
      </Container>
      <Container>
        <LeftColumn>
          <MarketPlace />
        </LeftColumn>
        <RightColumn style={{ display: 'grid' }}>
          <H1 style={{ alignItems: 'flex-start' }}>Buy Alium Finance (ALM) token</H1>
          <H2>
            Alium Finance team is on the way to reach several milestones aimed on increasing of ALM token value. Be
            ahead of the market and join the ALM holders community!
          </H2>
          <ActionButton>Buy ALM</ActionButton>
        </RightColumn>
      </Container>
      <Container3>
        <LeftColumn>
          <H1>
            <div className='title'>Alium Swap is always at hand</div>
          </H1>
          {/* <MotionLeftColumn xInitial={-20} xDuration={0.8}>
            <StartingSoon>15.06.2021</StartingSoon>
          </MotionLeftColumn> */}
          <MotionLeftColumn xInitial={-60} xDuration={1}></MotionLeftColumn>
          <MotionLeftColumn xInitial={-40} xDuration={0.8}></MotionLeftColumn>
          <MotionLeftColumn xInitial={-50} xDuration={1.1}>
            {/* <EmailContainer>
              <InputStyled>
                {!hideLabel && <label>Your email</label>}
                <Input
                  isWarning={!!emailError}
                  scale="lg"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={handleChangeEmail}
                  onBlur={() => setHideLabel(false)}
                  onFocus={() => setHideLabel(true)}
                  type="email"
                  name="email"
                />
                {emailError && <InputErrorStyled>{emailError}</InputErrorStyled>}
              </InputStyled>
              <ActionButton onClick={handleSubmitEmail}>{isLoading ? <StyledLoader /> : 'Send'}</ActionButton>
            </EmailContainer> */}
          </MotionLeftColumn>
        </LeftColumn>
        <RightColumn></RightColumn>
      </Container3>
    </>
  )
}

export default HomeNew
