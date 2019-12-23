import React, { useEffect, useReducer, useCallback } from 'react'
import { api, FetchPageResponse } from '../../api/api'
import { Shipment } from '../../models/shipment'
import { SearchBar } from '../search-bar/SearchBar'
import ShipmentsList from '../shipments-list/ShipmentsList'
import { Paginator } from '../Paginator'
import './ShipmentTracker.css'

type AppState = {
  loading: boolean
  shipments: Shipment[]
  currentPage: number
  totalRecords: number
  searchTerm: string
  errorMessage: string
  sortColumn: string | undefined
  sortOrder: string | undefined
}

const initialState: AppState = {
  loading: false,
  shipments: [],
  currentPage: 1,
  totalRecords: 0,
  searchTerm: '',
  errorMessage: '',
  sortColumn: 'id',
  sortOrder: 'asc'
}

type Action =
  | {
      type: 'REQUEST_SHIPMENT_PAGE'
      payload: { pageNumber?: number; sortColumn?: string; sortOrder?: string }
    }
  | { type: 'SHIPMENT_PAGE_SUCCESS'; payload: FetchPageResponse }
  | { type: 'SHIPMENT_PAGE_FAILURE'; payload: string }
  | { type: 'REQUEST_SHIPMENT_SEARCH'; payload: string }
  | { type: 'SHIPMENT_SEARCH_SUCCESS'; payload: Shipment }
  | { type: 'SHIPMENT_SEARCH_FAILURE'; payload: string }

export function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case 'REQUEST_SHIPMENT_PAGE':
      return {
        ...state,
        loading: true,
        errorMessage: '',
        currentPage: action.payload.pageNumber || state.currentPage,
        sortColumn: action.payload.sortColumn || state.sortColumn,
        sortOrder: action.payload.sortOrder || state.sortOrder
      }
    case 'SHIPMENT_PAGE_SUCCESS':
      return {
        ...state,
        shipments: action.payload.data,
        totalRecords: action.payload.totalRecords,
        errorMessage: '',
        loading: false
      }
    case 'SHIPMENT_PAGE_FAILURE':
      return {
        ...state,
        errorMessage: 'Error occurred: ' + action.payload,
        loading: false
      }
    default:
      return state
  }
}

export type PageParameters = {
  pageNumber?: number
  sortColumn?: string
  sortOrder?: string
}

interface ShipmentContextInterface {
  state: AppState
  dispatch: any
  fetchShipmentPage: (params: PageParameters) => void
}

export const ShipmentContext = React.createContext<ShipmentContextInterface>(
  {} as ShipmentContextInterface
)

export function ShipmentsTracker() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchShipmentPage = useCallback(
    ({ pageNumber, sortColumn, sortOrder }: PageParameters) => {
      dispatch({
        type: 'REQUEST_SHIPMENT_PAGE',
        payload: { pageNumber, sortColumn, sortOrder }
      })
    },
    []
  )

  useEffect(() => {
    api
      .fetchShipmentPage(state.currentPage, state.sortColumn, state.sortOrder)
      .then((response: FetchPageResponse) => {
        //   debugger
        dispatch({ type: 'SHIPMENT_PAGE_SUCCESS', payload: response })
      })
      .catch((error: any) =>
        dispatch({ type: 'SHIPMENT_PAGE_FAILURE', payload: error })
      )
  }, [state.currentPage, state.sortColumn, state.sortOrder])

  return (
    <>
      <ShipmentContext.Provider value={{ state, dispatch, fetchShipmentPage }}>
        <div className='container search-container center'>
          <SearchBar />
        </div>
        {state.errorMessage && (
          <div className='container'>
            <div className='notification is-danger error'>
              {/* <button className='delete'></button> */}
              {state.errorMessage}
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
