import { FetchPageResponse } from '../../api/api'
import { Shipment } from '../../models/shipment'

/* Main Shipment list state for use in useReducer hook */
export type AppState = {
  loading: boolean
  shipments: Shipment[]
  currentPage: number
  totalRecords: number
  errorMessage: string
  sortColumn: string | undefined
  sortOrder: string | undefined
}
export const initialState: AppState = {
  loading: false,
  shipments: [],
  currentPage: 1,
  totalRecords: 0,
  errorMessage: '',
  sortColumn: 'id',
  sortOrder: 'asc'
}
/* Possible Actions */
type Action =
  | {
      type: 'REQUEST_SHIPMENT_PAGE'
      payload: {
        pageNumber?: number
        sortColumn?: string
        sortOrder?: string
      }
    }
  | {
      type: 'SHIPMENT_PAGE_SUCCESS'
      payload: FetchPageResponse
    }
  | {
      type: 'SHIPMENT_PAGE_FAILURE'
      payload: string
    }
/* Reducer to use with useReducer hook */
export const reducer = (shipmentsListState = initialState, action: Action): AppState  => {

  // debugger;
  switch (action.type) {
    case 'REQUEST_SHIPMENT_PAGE':
      return {
        ...shipmentsListState,
        loading: true,
        errorMessage: '',
        currentPage: action.payload.pageNumber || shipmentsListState.currentPage,
        sortColumn: action.payload.sortColumn || shipmentsListState.sortColumn,
        sortOrder: action.payload.sortOrder || shipmentsListState.sortOrder
      }
    case 'SHIPMENT_PAGE_SUCCESS':
      return {
        ...shipmentsListState,
        shipments: action.payload.data,
        totalRecords: action.payload.totalRecords,
        errorMessage: '',
        loading: false
      }
    case 'SHIPMENT_PAGE_FAILURE':
      return {
        ...shipmentsListState,
        errorMessage: 'Error occurred: ' + action.payload,
        loading: false
      }
    default:
      return shipmentsListState
  }
}
