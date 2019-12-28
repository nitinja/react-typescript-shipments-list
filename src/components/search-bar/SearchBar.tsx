import React, { useCallback, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import './SearchBar.css'


/* Search Bar Component */
export default function SearchBar() {
  const { dispatch } = useContext(ShipmentContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const handleSearch = useCallback(() => {
    const term = inputRef.current?.value
    if (!term) {
      return
    }
    if (!validateIdFormat(term)) {
      dispatch({
        type: 'SHIPMENT_PAGE_FAILURE',
        payload: 'Please enter correct ID. Example: "S1000"'
      })
    } else {
      history.push(`/shipment/${term}`)
    }
  }, [dispatch, history])
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
          data-testid="search"
          type='text'
          placeholder='Enter Shipment Id. For Example "S1000"'
          ref={inputRef}
          onKeyDown={handleEnter}
        />
      </div>
      <div className='control'>
        <button className='button is-info'  data-testid="search-button" onClick={handleSearch}>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  )
}

const validateIdFormat = (term: string): boolean => {
  return /^[A-Z]\d+$/.test(term)
}
