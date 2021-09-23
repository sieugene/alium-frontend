import { FARM_BSC_ALM } from 'config/constants/farms'
import { ethers } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { approveTokenToSpender } from 'utils/callHelpers'
import { useFarmingTicketWindow, useTokenContract } from './../../../hooks/useContract'

export const useFarmTicket = () => {
  const contract = useFarmingTicketWindow()
  const { hasTicket } = useHasTicket()
  const approve = useApproveTicket(contract?.address)

  const buyTicket = async () => {
    try {
      await approve()
      const buyRes = await contract.buyTicket()
    } catch (error) {
      console.error(error)
    }
  }
  return { hasTicket, buyTicket }
}

const useApproveTicket = (address: string) => {
  const { account } = useActiveWeb3React()
  const value = ethers.utils.parseEther('1500')
  const token = FARM_BSC_ALM
  const contract = useTokenContract(token?.address)
  const approve = approveTokenToSpender(contract, value, address, account)
  return approve
}

export const useHasTicket = () => {
  const [hasTicket, setHasTicket] = useState<null | boolean>(null)
  const [loading, setloading] = useState(false)
  const { account } = useActiveWeb3React()
  const contract = useFarmingTicketWindow()

  const onHasTicket = useCallback(async () => {
    if (loading) {
      return
    }
    setloading(true)
    try {
      const has = await contract.hasTicket(account)

      setHasTicket(has)
    } catch (error) {
    } finally {
      setloading(false)
    }
  }, [account, contract, loading])

  const allowFetch = useMemo(() => contract && account, [account, contract])

  useEffect(() => {
    if (allowFetch) {
      onHasTicket()
    }
  }, [allowFetch])
  return { hasTicket }
}
