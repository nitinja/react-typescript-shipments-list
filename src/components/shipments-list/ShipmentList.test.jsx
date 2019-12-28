import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TEST_DATA } from '../../test-data/test-data'
// import { BrowserRouter } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import ShipmentsList from './ShipmentsList'

afterEach(cleanup)

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

describe('ShipmentList component ', () => {
    test('Shipment List component shows loading text when provided with loading state', () => {
        const contextObject = {
          shipmentsListState: { loading: true },
          fetchShipmentPage: () => {}
        }
        const { getByText } = render(
          <ShipmentContext.Provider value={contextObject}>
            <ShipmentsList />
          </ShipmentContext.Provider>
        )
        expect(getByText(/loading/i).textContent).toBe('Loading...')
      })

      test('renders table with given data ', () => {

          const contextObject = {
              shipmentsListState: { loading: false, shipments: TEST_DATA.slice(0,20) },
              fetchShipmentPage: () => {}
            }
            const { getAllByTestId } = render(
              <BrowserRouter>
              <ShipmentContext.Provider value={contextObject}>
                <ShipmentsList />
              </ShipmentContext.Provider>
              </BrowserRouter>
            )
            expect(getAllByTestId("shipmentrow")).toHaveLength(20)
            expect(getAllByTestId("shipmentid")[0].textContent).toBe('S1000')
      })

      test('when clicked on id, takes to shipment detail page ', () => {

          const contextObject = {
              shipmentsListState: { loading: false, shipments: TEST_DATA },
              fetchShipmentPage: () => {}
            }
            const { getAllByTestId } = render(
              <BrowserRouter>
              <ShipmentContext.Provider value={contextObject}>
                <ShipmentsList />
              </ShipmentContext.Provider>
              </BrowserRouter>
            )
            //click on link
            fireEvent.click(getAllByTestId("shipmentid")[0])
            expect(window.location.href).toContain("/shipment/S1000")
      })
})
