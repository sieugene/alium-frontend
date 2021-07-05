import { getActualChainId } from 'alium-uikit/src/util/chainId/getActualChainId'
import Cookies from 'universal-cookie'
import { chainIdCookieKey } from '../../config'
import { getCookieOptions } from '../../config/getCookieOptions'

const cookies = new Cookies()

type setChainId = (chainId: string | number) => void

const setChainId: setChainId = (chainId) => {
  cookies.set(chainIdCookieKey, getActualChainId(Number(chainId)), getCookieOptions())
}

export default setChainId
