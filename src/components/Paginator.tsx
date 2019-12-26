import React, { useContext, useMemo } from 'react'
import { PAGE_SIZE } from '../api/api'
import { ShipmentContext } from './shipments-tracker/ShipmentsTracker'

/* Paginator Component */
export function Paginator() {
  const { state, fetchShipmentPage } = useContext(ShipmentContext)

  const totalPages = useMemo(() => Math.ceil(state.totalRecords / PAGE_SIZE), [state.totalRecords])

  return (
    <nav className='pagination' role='navigation' aria-label='pagination'>
      <button
        disabled={state.currentPage <= 1}
        className='pagination-previous'
        title='This is the first page'
        onClick={() => fetchShipmentPage({ pageNumber: state.currentPage - 1 })}
      >
        Previous
      </button>
      <button
        className='pagination-next'
        disabled={state.currentPage >= totalPages}
        onClick={() => fetchShipmentPage({ pageNumber: state.currentPage + 1 })}
      >
        Next page
      </button>
      <ul className='pagination-list'>
        {Array.from({ length: totalPages }, (item, index) => (
          <li key={index}>
            <button
              className={`pagination-link ${
                state.currentPage === index + 1 ? 'is-current' : ''
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
