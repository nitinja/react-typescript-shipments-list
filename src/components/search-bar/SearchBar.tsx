import React, { useContext, useState, useRef, useCallback } from 'react'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
export function SearchBar({}) {
  const { state, fetchShipmentPage, dispatch } = useContext(ShipmentContext)
  // const [term, setTerm] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSearch = useCallback(() => {
    const term = inputRef.current?.value
    if (!term) {
      return
    }
    // debugger
    if (!validateIdFormat(term)) {
      dispatch({
        type: 'SHIPMENT_PAGE_FAILURE',
        payload: 'Please enter correct ID. Example: "A9999", "S1000"'
      })
    }else{
      dispatch()
    }
    console.log(inputRef.current?.value)
  }, [dispatch])
  const handleEnter = useCallback(
    event => {
      if (event.key === 'Enter') {
        handleSearch()
      }
    },
    [handleSearch]
  )
  return (
    <div className='field has-addons'>
      <div className='control search-input-container'>
        <input
          className='input search-input'
          type='text'
          placeholder='Find a repository'
          ref={inputRef}
          onKeyDown={handleEnter}
        />
      </div>
      <div className='control'>
        <button className='button is-info' onClick={handleSearch}>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  )
}

export function validateIdFormat(term: string) {
  return /^[A-Z]\d+$/.test(term)
}
