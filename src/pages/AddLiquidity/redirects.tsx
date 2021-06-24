import { useRouter } from 'next/router'
import React from 'react'
import { ROUTES } from 'routes'
import AddLiquidity from './index'

export const RedirectToAddLiquidity = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push(ROUTES.add)
  }, [])
  return <div></div>
}

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const RedirectOldAddLiquidityPathStructure = () => {
  const router = useRouter()
  const { query } = router
  const currencyIdA = query?.currencyIdA as string
  const match = currencyIdA.match(OLD_PATH_STRUCTURE)
  if (match?.length) {
    router.push(ROUTES.addByMultiple(match[1], match[2]))
    return null
  }
  return <AddLiquidity currencyIdA={currencyIdA} />
}

export const RedirectDuplicateTokenIds = () => {
  const router = useRouter()
  const { query } = router
  const currencyIdA = query?.currencyIdA as string
  const currencyIdB = query?.currencyIdB as string

  if (currencyIdA?.toLowerCase() === currencyIdB?.toLowerCase()) {
    router.push(ROUTES.addByOne(currencyIdA))
    return null
  }
  return <AddLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
}
