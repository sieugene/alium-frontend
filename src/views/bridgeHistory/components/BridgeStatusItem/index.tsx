import { CheckMarkDoneIcon } from 'alium-uikit/src'
import Tooltip from 'components/Tooltip'
import { BridgeQuestionIcon } from 'images/bridge/BridgeQuestionIcon'
import { BridgeRepeatIcon } from 'images/bridge/BridgeRepeatIcon'
import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { BridgeHistoryStatuses } from 'views/bridgeHistory/bridgeHistory.types'

const StyledStatus = styled.div<{ status: BridgeHistoryStatuses }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 104px;
  text-align: right;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  svg {
    margin-right: 11px;
  }
  color: ${(props) => {
    switch (props.status) {
      case BridgeHistoryStatuses.Transferred:
        return '#24BA7B'
      case BridgeHistoryStatuses.Cancellation:
        return '#FF4D00'
      case BridgeHistoryStatuses.ClaimToken:
      case BridgeHistoryStatuses.Transfer:
        return `#FFA100;
        text-decoration-line: underline
        `
      default:
        return '#FF4D00'
    }
  }};
`

const BridgeStatusItem: FC<{ status: BridgeHistoryStatuses }> = ({ status }) => {
  const availableShowTooltip = status === BridgeHistoryStatuses.Cancellation
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <>
      <StyledStatus status={status} onClick={open} onMouseEnter={open} onMouseLeave={close}>
        <IconStatus status={status} />
        {availableShowTooltip ? (
          <Tooltip
            popoverClassName='bridge__popover'
            text='Insufficient funds'
            show={show}
            placement='bottom-end'
            classNameContainer='bridge__tooltip'
          >
            <p>{status}</p>
          </Tooltip>
        ) : (
          <p>{status}</p>
        )}
      </StyledStatus>
      <style jsx global>{`
        .bridge__tooltip {
          width: auto;
          box-shadow: 0px 2px 16px rgba(185, 189, 208, 0.48);
        }
        .bridge__popover {
          box-shadow: none;
          border: none;
        }
        .arrow-bottom-end:before {
          position: absolute;
          border: none;
          top: -47px;
        }
      `}</style>
    </>
  )
}

const IconStatus: FC<{ status: BridgeHistoryStatuses }> = ({ status }) => {
  switch (status) {
    case BridgeHistoryStatuses.Transferred:
      return <CheckMarkDoneIcon />
    case BridgeHistoryStatuses.Cancellation:
      return <BridgeQuestionIcon />
    case BridgeHistoryStatuses.ClaimToken:
    case BridgeHistoryStatuses.Transfer:
      return <BridgeRepeatIcon />
    default:
      return <></>
  }
}

export default BridgeStatusItem
