import { FC } from 'react'
import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  .title2 {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin: 8px 0 0 0;
  }

  header {
    padding: 24px;
    border-bottom: 1px solid #f4f5fa;
  }

  main {
    padding: 24px;
  }

  .tokens {
    width: 100%;
    margin: 16px 0;
    position: relative;
    padding: 16px;
    display: flex;
    align-items: center;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;

    border: 1px solid #d2d6e5;
    border-radius: 6px;
  }

  .tokens-amount {
    width: 100%;
    margin: 16px 0;
    position: relative;
    padding: 16px;
    display: flex;
    align-items: center;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;

    border: 1px solid #d2d6e5;
    border-radius: 6px;
  }

  .label {
    background: white;
    padding: 0 4px;
    position: absolute;
    top: -7px;
    left: 12px;

    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: #6c5dd3;
  }

  .button {
    margin: 12px 0;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    border-radius: 6px;
    background: #6c5dd3;
    color: #ffffff;
    cursor: pointer;

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
  }
`

export const Step2YourLiquidity: FC = () => {
  return (
    <Root>
      <header>
        <div className='title'>Your Liquidity</div>
        <div className='title2'>
          Click on a pool below, input the amount you wish to migrate or select max, and click migrate
        </div>
      </header>
      <main>
        <div className='tokens'>
          <div className='label'>Tokens</div>
          <span>BNB/ALM</span>
        </div>
        <div className='tokens-amount'>
          <div className='label'>Amount of Tokens</div>
          <span>0000.123</span>
        </div>
        <div>Balance: 3.722</div>
        <div className='button'>Migrate</div>
      </main>
    </Root>
  )
}
