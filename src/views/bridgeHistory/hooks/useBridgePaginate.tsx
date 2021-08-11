import { useState } from 'react'
import { RowItem } from '../components/BridgeTableCol'

interface Params {
  items: RowItem[]
  pageLimit?: number
}
export const useBridgePaginate = ({ items, pageLimit = 30 }: Params) => {
  const sliceItems = (page: number): Params['items'] => {
    const offset = (page - 1) * pageLimit
    return items?.length && items.slice(offset, offset + pageLimit)
  }
  const [page, setpage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(sliceItems(1))

  const totalRecords = items.length
  const totalPages = Math.ceil(totalRecords / pageLimit)
  const currentPage = page

  const onPageChanged = (page: number) => {
    setpage(page)
    setItemsPerPage(sliceItems(page))
  }

  return {
    totalPages,
    currentPage,
    onPageChanged,
    items: itemsPerPage,
  }
}
