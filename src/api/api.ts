/* eslint no-restricted-globals:0 */

import { Shipment } from '../models/shipment'

export const URI = '/'
export const PAGE_SIZE = 20



export type FetchPageResponse = {
  data: Shipment[]
  totalRecords: number
}

const fetchShipmentPage = (
  pageNumber: number, sortColumn?: string, sortOrder?: string
): Promise<FetchPageResponse> => {
  // debugger
  const url = new URL(location.href + '/shipments')
  url.searchParams.append('_page', String(pageNumber))
  url.searchParams.append('_sort', String(sortColumn))
  url.searchParams.append('_order', String(sortOrder))
  url.searchParams.append('_limit', String(PAGE_SIZE))

  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then(async (response: any) => {
        if (response.status === 200) {
          // debugger
          console.log(response.headers.get('x-total-count'));
          resolve({
            data: await response.json(),
            totalRecords: response.headers.get('x-total-count')
          })
        }
        if (response.status === 404) {
          reject('No shipment Found.')
        } else {
          reject('Error occurred while fetching shipments.')
        }
      })
      .catch(() => reject('Error occurred while fetching shipments.'))
  })
}

export const api = {
  fetchShipmentPage
}
