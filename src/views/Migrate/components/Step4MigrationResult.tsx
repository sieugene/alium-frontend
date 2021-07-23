import copy from 'copy-to-clipboard'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconClose } from 'views/Migrate/components/IconClose'
import { IconCopy } from 'views/Migrate/components/IconCopy'
import { IconNotSuccessful } from 'views/Migrate/components/IconNotSuccessful'
import { IconSuccessful } from 'views/Migrate/components/IconSuccessful'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  position: relative;

  @media screen and (min-width: 768px) {
    padding: 90px 0;
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 15px;
    margin: 4px;
    cursor: pointer;
    border-radius: 6px;
  }

  .close:hover {
    background: #eeeeee;
  }

  .title {
    font-family: Roboto, sans-serif;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin: 24px 8px 10px 8px;
    text-align: center;
  }

  .title.error {
    margin: 24px 0 36px 0;
    color: #ff4d00;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    border-radius: 6px;
    background: #6c5dd3;
    color: #ffffff;
    cursor: pointer;

    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
  }

  .button:hover {
    background: #8677f0;
  }

  .copy {
    padding: 12px 16px;
    width: 100%;
    max-width: 354px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;

    border: 1px solid #d2d6e5;
    border-radius: 6px;
  }

  .copy input {
    border: none;
    outline: none;
    width: 100%;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #8990a5;
  }

  .copy svg {
    cursor: pointer;
  }

  .view-on-explorer {
    padding: 12px;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
  }
`

interface props {
  pair?: { title: string; symbolA: string; symbolB: string; addressLP: string; exchange: string; balance: number }
  isSuccessful: boolean
  contract?: string
  explorer?: string
  setStep1: () => void
  handleTryAgain: () => void
}

export const Step4MigrationResult: FC<props> = ({
  pair = {},
  isSuccessful,
  contract = '',
  explorer = '',
  setStep1,
  handleTryAgain,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = (str) => {
    setIsCopied(copy(str))
  }

  useEffect(() => {
    if (isCopied) {
      let timer = setTimeout(() => setIsCopied(false), 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isCopied])

  const inputValue = isCopied ? 'Copied' : contract

  return (
    <>
      <Root>
        <div className='close' onClick={setStep1}>
          <IconClose />
        </div>
        {isSuccessful ? (
          <>
            <IconSuccessful />
            <div className='title'>
              Migrate {pair.exchange} {pair.title} liquidity to AliumSwap
            </div>
            <div className='copy'>
              <span>Token Alium-LP: </span>
              <input type='text' value='0x15577fe532359695362822fc58016e796f750a8d' />
              <div onClick={handleCopy}>
                <IconCopy />
              </div>
            </div>
            <Link href={`${explorer}tx/${contract}`}>
              <a className='view-on-explorer' target='_blank'>
                {'View on explorer >'}
              </a>
            </Link>
          </>
        ) : (
          <>
            <IconNotSuccessful />
            <div className='title error'>Migration failed</div>

            <div className='button' onClick={handleTryAgain}>
              Try again
            </div>
          </>
        )}
      </Root>
    </>
  )
}
