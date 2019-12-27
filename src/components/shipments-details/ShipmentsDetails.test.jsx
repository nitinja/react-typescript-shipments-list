import { cleanup, fireEvent, render, wait } from '@testing-library/react'
import 'jest-fetch-mock'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { TEST_DATA } from '../../test-data/test-data'
import ShipmentsDetails from './ShipmentsDetails'

jest.setTimeout(10000)

afterEach(() => {
  cleanup()
})

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useParams: () => ({
    id: 'S1000'
  })
}))

describe('ShipmentDetails component ', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('shows shipment data when provided with shipment id in url', async () => {
    fetch.mockResponseOnce(JSON.stringify(TEST_DATA[0]), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

    const { getByLabelText } = render(
      <BrowserRouter>
        <ShipmentsDetails />
      </BrowserRouter>
    )

    await wait(() => expect(getByLabelText('UserId').textContent).toBe('U1000'))
  })
  test('shows shipment data when provided with shipment id in url', async () => {
    fetch.mockResponseOnce(JSON.stringify(TEST_DATA[0]), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

    const { getByTestId, getByLabelText } = render(
      <BrowserRouter>
        <ShipmentsDetails />
      </BrowserRouter>
    )

    await wait(() => expect(getByLabelText('UserId').textContent).toBe('U1000'))

    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

    fireEvent.change(getByLabelText('Name'), { target: { value: 'testval' } })
    fireEvent.click(getByTestId('updatebutton'), {})

    expect(fetch.mock.calls.length).toEqual(1)
    const [url, { method, body }] = fetch.mock.calls[0]
    expect(method).toEqual('put')
    expect(url).toContain('/shipments/S1000')
    expect(body).toContain('testval')
  })
})
