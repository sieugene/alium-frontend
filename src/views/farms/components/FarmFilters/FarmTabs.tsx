import { FARM_MOBILE_MEDIA } from 'constants/layout/farm.layout'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { FarmTab } from 'views/farms/farms.types'

const Tabs = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 6px;
  background: #ebedf9;
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    justify-content: flex-start;
  }
`
const Tab = styled.div<{ active: boolean }>`
  background: ${(props) => (props.active ? '#6C5DD3' : '#EBEDF9')};
  border-radius: 6px;
  padding: 14px 24px 14px 24px;
  width: fit-content;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: ${(props) => (props.active ? '#FFFFFF' : '#6C5DD3')};
  cursor: pointer;
  transition: 0.2s all ease;
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    height: 40px;
    padding: 10px 16px 10px 16px;
  }
`

export const FarmTabs = () => {
  const { t } = useTranslation()
  const setActiveTab = useStoreFarms((state) => state.setActiveTab)
  const activeTab = useStoreFarms((state) => state.activeTab)

  const changeActive = (tab: FarmTab) => {
    setActiveTab(tab)
  }
  return (
    <Tabs>
      <Tab
        onClick={() => {
          changeActive(FarmTab.live)
        }}
        active={FarmTab.live === activeTab}
      >
        {t('Live')}
      </Tab>
      <Tab
        onClick={() => {
          changeActive(FarmTab.finished)
        }}
        active={FarmTab.finished === activeTab}
      >
        {t('Finished')}
      </Tab>
    </Tabs>
  )
}
