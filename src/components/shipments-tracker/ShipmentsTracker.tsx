import React, { useCallback, useEffect, useReducer } from 'react'
import { api, FetchPageResponse } from '../../api/api'
import Paginator from '../Paginator'
import SearchBar from '../search-bar/SearchBar'
import ShipmentsList from '../shipments-list/ShipmentsList'
import './ShipmentTracker.css'
import { AppState, reducer, initialState } from './reducer'

export type PageParameters = {
  pageNumber?: number
  sortColumn?: string
  sortOrder?: string
}

/* useReducer will be used with context to provide state to children components.*/
interface ShipmentContextInterface {
  shipmentsListState: AppState
  dispatch: any
  fetchShipmentPage: (params: PageParameters) => void
}

/* Content to serve app state and dispatcher to children tree */
export const ShipmentContext = React.createContext<ShipmentContextInterface>(
  {} as ShipmentContextInterface
)

/* Shipments list Component. Uses reducer + context pattern, no Redux necessary since its a small app. */
export default function ShipmentsTracker() {

  /* State of main shipment list and dispatcher */
  const [shipmentsListState, dispatch] = useReducer(reducer, initialState)

  const fetchShipmentPage = useCallback(
    ({ pageNumber, sortColumn, sortOrder }: PageParameters) => {
      dispatch({
        type: 'REQUEST_SHIPMENT_PAGE',
        payload: { pageNumber, sortColumn, sortOrder }
      })
    },
    []
  )

  /* Effect to fetch shipments thru API class - each time page params changes */
  useEffect(() => {
    api
      .fetchShipmentPage(shipmentsListState.currentPage, shipmentsListState.sortColumn, shipmentsListState.sortOrder)
      .then((response: FetchPageResponse) => {
        dispatch({ type: 'SHIPMENT_PAGE_SUCCESS', payload: response })
      })
      .catch((error: any) =>
        dispatch({ type: 'SHIPMENT_PAGE_FAILURE', payload: error })
      )
  }, [shipmentsListState.currentPage, shipmentsListState.sortColumn, shipmentsListState.sortOrder])

  return (
    <>
      <ShipmentContext.Provider value={{ shipmentsListState, dispatch, fetchShipmentPage }}>
        <div className='container search-container center'>
          <SearchBar />
        </div>
        {shipmentsListState.errorMessage && (
          <div className='container'>
            <div className='notification is-danger error'>
              {shipmentsListState.errorMessage}
            </div>
          </div>
        )}
        <div className='container content-wrapper'>
          <ShipmentsList />
          <Paginator />
        </div>
      </ShipmentContext.Provider>
    </>
  )
}
