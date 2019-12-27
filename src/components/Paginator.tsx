import React, { useContext, useMemo } from 'react'
import { PAGE_SIZE } from '../api/api'
import { ShipmentContext } from './shipments-tracker/ShipmentsTracker'

/* Paginator Component */
export default function Paginator() {
  const { shipmentsListState, fetchShipmentPage } = useContext(ShipmentContext)

  const totalPages = useMemo(() => Math.ceil(shipmentsListState.totalRecords / PAGE_SIZE), [shipmentsListState.totalRecords])

  return (
    <nav className='pagination' role='navigation' aria-label='pagination'>
      <button
        disabled={shipmentsListState.currentPage <= 1}
        className='pagination-previous'
        title='This is the first page'
        onClick={() => fetchShipmentPage({ pageNumber: shipmentsListState.currentPage - 1 })}
      >
        Previous Page
      </button>
      <button
        className='pagination-next'
        disabled={shipmentsListState.currentPage >= totalPages}
        onClick={() => fetchShipmentPage({ pageNumber: shipmentsListState.currentPage + 1 })}
      >
        Next Page
      </button>
      <ul className='pagination-list'>
        {Array.from({ length: totalPages }, (item, index) => (
          <li key={index}>
            <button
              className={`pagination-link ${
                shipmentsListState.currentPage === index + 1 ? 'is-current' : ''
              }`}
              onClick={() => fetchShipmentPage({ pageNumber: index + 1 })}
              aria-label='Page '
              aria-current='page'
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
