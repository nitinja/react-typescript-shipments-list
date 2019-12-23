import React, { useContext } from 'react'
import { PAGE_SIZE } from '../api/api'
import { ShipmentContext } from './shipments-tracker/ShipmentsTracker'
// interface Props {
//   currentPage: number
//   totalRecords: number
//   navigateToPage: (pageNumber: number) => void
// }
export function Paginator({}) {
const {state, fetchShipmentPage, dispatch} = useContext(ShipmentContext);

  const totalPages = Math.ceil(state.totalRecords / PAGE_SIZE)

  return (

    <nav className='pagination' role='navigation' aria-label='pagination'>
      <button
        disabled={state.currentPage <= 1}
        className='pagination-previous'
        title='This is the first page'
        onClick={() => fetchShipmentPage({pageNumber: state.currentPage - 1})}
      >
        Previous
      </button>
      <button
        className='pagination-next'
        disabled={state.currentPage >= totalPages}
        onClick={() => fetchShipmentPage({pageNumber: state.currentPage + 1})}
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
              onClick={() => fetchShipmentPage({pageNumber: index + 1})}
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
