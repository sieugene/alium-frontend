import { Button, CardBody, Text } from 'alium-uikit/src'
import { LightCard } from 'components/Card'
import { CardNav } from 'components/CardNav'
import { AutoColumn } from 'components/Column'
import UnlockButton from 'components/ConnectWalletButton'
import PageHeader from 'components/PageHeader'
import FullPositionCard from 'components/PositionCard'
import Question from 'components/QuestionHelper'
import { StyledInternalLink, TYPE } from 'components/Shared'
import { Dots } from 'components/swap/styleds'
import { useActiveWeb3React } from 'hooks'
import { useAllV2PairsWithLiquidity } from 'hooks/pool/useAllV2PairsWithLiquidity'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ROUTES } from 'routes'
import styled, { ThemeContext } from 'styled-components'
import SwapAppBody from 'views/Swap/SwapAppBody'

const { body: Body } = TYPE

const CardWrapper = styled.div`
  width: 100%;
`

const StyledCardBody = styled.div<{ singleBlock?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 34px 24px 32px 24px;
  align-items: center;
  // max-width: 48%;
  height: 114px;
  border-bottom: 1px solid #f4f5fa;

  > div {
    text-align: center;
  }

  > div:last-child {
    flex-basis: 80%;
  }

  > div:first-child {
    display: flex;
    > button {
      margin-top: 0;
    }
  }

  > a {
    width: 173px;
  }

  @media screen and (max-width: 461px) {
    flex-direction: column-reverse;
    height: 196px;
    padding: 26px 24px 32px 24px;

    ${({ singleBlock }) =>
      singleBlock &&
      `
      padding: 0; 
      height: 96px;
      flex-direction: row;
      padding-left: 16px;
      > div {
        flex-basis: 0 !important;
      }
    `}

    > div {
      flex-basis: 60%;
    }

    > button {
      width: 100%;
    }
  }
`

interface StyledLiquidityProps {
  found?: boolean
}

const StyledLiquidity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  @media screen and (max-width: 414px) {
    padding-left: 24px;
  }
  ${(props: StyledLiquidityProps) =>
    props.found &&
    `
    justify-content: flex-start;
    border-bottom: 1px solid #F4F5FA;
    padding: 16px;
  `}
`

const StyledRightSide = styled.div``

const StyledYourLiquidity = styled.div`
  margin: 24px;
  border: 1px solid #f4f5fa;
  box-sizing: border-box;
  border-radius: 6px;

  @media screen and (max-width: 376px) {
    margin: 16px;
  }
`

const StyledFoundLiquidity = styled.div`
  padding: 16px;
  overflow-y: auto;
  > div:not(:last-child) {
    border-bottom: 1px solid #f4f5fa;
  }
`

const StyledFullPositionCard = styled.div`
  div {
    padding: 6px 6px 6px 2px;
    border: none;
  }
  div:hover {
    border: none;
  }
  > a {
    width: auto !important;
  }
  > div > div > div div:last-child {
    justify-content: flex-start;
  }

  > div > div > div div:last-child a {
    margin-right: 20px;
  }
  @media screen and (max-width: 576px) {
    div {
      padding: 6px 6px 6px 0;
    }
  }
`

export default function Pool() {
  const { data, loading } = useAllV2PairsWithLiquidity()
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const { account /* , chainId */ } = useActiveWeb3React()
  const { t } = useTranslation()

  const getButton = () => {
    return (
      // chainId === 56 || chainId === 128 ?
      // (
      //   <Button disabled style={{ background: "#CBC8EE" }} id="join-pool-button" as={Link} to="/add/ETH">
      //     {t('addLiquidity')}
      //   </Button>
      // ) : (
      <Button
        id='join-pool-button'
        onClick={() => {
          router.push(ROUTES.addByOne('ETH'))
        }}
      >
        {t('addLiquidity')}
      </Button>
      // )
    )
  }
  return (
    <CardWrapper>
      <CardNav activeIndex={1} />
      <SwapAppBody>
        <PageHeader title={t('mainMenu.liquidity')} description={t('liquidityDescription')} />
        <StyledCardBody singleBlock={data?.length > 0}>
          {!account ? <UnlockButton /> : getButton()}
          <StyledRightSide>
            {data?.length === 0 && (
              <>
                <StyledLiquidity>
                  <Text color={theme.colors.text}>{t('yourLiquidity')}</Text>
                  <Question text={t('questionHelperMessages.addLiquidity')} />
                </StyledLiquidity>
                {!account ? (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center' style={{ fontSize: '14px' }}>
                      {t('liquidityConnectToWallet')}
                    </Body>
                  </LightCard>
                ) : loading ? (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center'>
                      <Dots>{t('loading')}</Dots>
                    </Body>
                  </LightCard>
                ) : data?.length > 0 ? (
                  <>
                    {data.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center'>
                      {t('liquidityNotFound')}
                    </Body>
                  </LightCard>
                )}
              </>
            )}
          </StyledRightSide>
        </StyledCardBody>
        {data?.length > 0 && (
          <StyledYourLiquidity>
            <StyledLiquidity found>
              <Text color={theme.colors.text}>{t('yourLiquidity')}</Text>
              <Question text={t('questionHelperMessages.addLiquidity')} />
            </StyledLiquidity>
            <StyledFoundLiquidity>
              {data.map((v2Pair) => (
                <StyledFullPositionCard key={v2Pair.liquidityToken.address}>
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                </StyledFullPositionCard>
              ))}
            </StyledFoundLiquidity>
          </StyledYourLiquidity>
        )}
        <AutoColumn gap='lg'>
          <CardBody>
            <AutoColumn gap='12px' style={{ width: '100%' }}>
              <div>
                <Text fontSize='14px' style={{ padding: '.5rem 0 .5rem 0' }}>
                  {t('noJoinedPool')}{' '}
                  <StyledInternalLink id='import-pool-link' href='/find'>
                    {t('importPoolMessage')}
                  </StyledInternalLink>
                </Text>
                {/* <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                  Or, if you staked your FLIP tokens in a farm, unstake them to see them here.
                </Text> */}
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </SwapAppBody>
    </CardWrapper>
  )
}
