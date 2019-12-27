import { cleanup, fireEvent, render, wait } from '@testing-library/react'
import 'jest-fetch-mock'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import { TEST_DATA } from '../../test-data/test-data'
import ShipmentsTracker from './ShipmentsTracker'


jest.setTimeout(10000);

afterEach(() => {
  cleanup()
  jest.resetAllMocks()
})

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

// tests entire flow
describe('ShipmentTracker component ', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('Shipment Tracker component shows data table and pagination', async () => {

    const contextObject = {
      shipmentsListState: { loading: false, shipments: [] },
      fetchShipmentPage: () => {}
    }

    fetch.mockResponseOnce(JSON.stringify(TEST_DATA.slice(0,20)), {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-total-count': 24 }
    })

    const { getByText, queryByText, getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <ShipmentContext.Provider value={contextObject}>
          <ShipmentsTracker />
        </ShipmentContext.Provider>
      </BrowserRouter>
    )

    // loading text
    expect(queryByText(/loading/i)).not.toBeNull()

    //Search box and placeholder
    expect(getByTestId('search').placeholder).toBe(
      'Enter Shipment Id. For Example "S1000"'
    )

    // first page of table loaded
    await wait(() => expect(getAllByTestId('shipmentrow')).toHaveLength(20))
    await wait(() => expect(getAllByTestId('shipmentid')[0].textContent).toBe('S1000'))

    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(TEST_DATA.slice(20)), {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-total-count': 24 }
    })

    //pagination - next button click and second page
    fireEvent.click(getByText('Next Page'), {});

    await wait(() => expect(getAllByTestId('shipmentrow')).toHaveLength(4))
    await wait(() => expect(getAllByTestId('shipmentid')[0].textContent).toBe('S1020'))


    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(TEST_DATA.slice(0,20)), {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-total-count': 24 }
    })

    //pagination - previous button click and first page again
    fireEvent.click(getByText('Previous Page'), {});

    await wait(() => expect(getAllByTestId('shipmentrow')).toHaveLength(20))
    await wait(() => expect(getAllByTestId('shipmentid')[0].textContent).toBe('S1000'))

    // sorting
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(TEST_DATA.sort((a,b) => a.name.localeCompare(b.name)).slice(0,20)), {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-total-count': 24 }
    })

    //click column header
    fireEvent.click(getByTestId('nameheader'), {});

    await wait(() => expect(getAllByTestId('shipmentrow')).toHaveLength(20))
    await wait(() => expect(getAllByTestId('shipmentname')[0].textContent).toBe('Helmets'))

  })
})