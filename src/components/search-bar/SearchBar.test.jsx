import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import { SearchBar } from './SearchBar'

afterEach(cleanup)

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

const dispatchMock = jest.fn()
describe("SearchBar component", () => {
  test('Search component shows textbox and placeholder', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    expect(getByTestId('search').placeholder).toBe(
      'Enter Shipment Id. For Example "S1000"'
    )
  })
  test('Search component shows text when entered', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    fireEvent.change(getByTestId('search'), { target: { value: 'S9999' } })
    expect(getByTestId('search').value).toBe('S9999')
  })

  test('Search component redirects to details page when search button clicked', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )
    fireEvent.change(getByTestId('search'), { target: { value: 'S9999' } })
    expect(getByTestId('search').value).toBe('S9999')
    fireEvent.click(getByTestId('search-button'))
    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/shipment/S9999')
  })

  test('Search component dispatched failed action when entered incorrectly formatted input', () => {
    const { getByTestId } = render(
      <ShipmentContext.Provider value={{ dispatch: dispatchMock }}>
        <SearchBar />
      </ShipmentContext.Provider>
    )
    fireEvent.change(getByTestId('search'), { target: { value: '0000' } })
    fireEvent.click(getByTestId('search-button'))

    mockHistoryPush.mockClear()
    expect(mockHistoryPush).toHaveBeenCalledTimes(0)
    expect(dispatchMock).toHaveBeenCalledTimes(1)

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'SHIPMENT_PAGE_FAILURE',
      payload: 'Please enter correct ID. Example: "S1000"'
    })
  })

})
