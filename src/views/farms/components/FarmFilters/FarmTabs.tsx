import { useState } from 'react'
import styled from 'styled-components'
import { objectParamsToFalse } from 'utils/common/objectParamsToFalse'

const Tabs = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 6px;
  background: #ebedf9;
`
const Tab = styled.div<{ active: boolean }>`
  background: ${(props) => (props.active ? '#6C5DD3' : '#EBEDF9')};
  border-radius: 6px;
  padding: 14px 24px 14px 24px;
  width: fit-content;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: ${(props) => (props.active ? '#FFFFFF' : '#6C5DD3')};
  cursor: pointer;
  transition: 0.2s all ease;
`

export const FarmTabs = () => {
  const [activeTab, setActiveTab] = useState({
    live: true,
    finished: false,
  })

  const changeActive = (tab: keyof typeof activeTab) => {
    setActiveTab((state) => ({
      ...objectParamsToFalse(state),
      [tab]: true,
    }))
  }
  return (
    <Tabs>
      <Tab
        onClick={() => {
          changeActive('live')
        }}
        active={activeTab.live}
      >
        Live
      </Tab>
      <Tab
        onClick={() => {
          changeActive('finished')
        }}
        active={activeTab.finished}
      >
        Finished
      </Tab>
    </Tabs>
  )
}
