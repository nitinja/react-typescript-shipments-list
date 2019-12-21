import React from 'react'
import { SearchBar } from '../search-bar/SearchBar'
import ShipmentsList from '../shipments-list/ShipmentsList'

export function ShipmentsTracker({}) {
  return (
    <>
      <div className='container search-container center'>
        <SearchBar />
      </div>
      <div className='container content-wrapper'>
        <ShipmentsList />
      </div>
    </>
  )
}
