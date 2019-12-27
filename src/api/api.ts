/* eslint no-restricted-globals:0 */

import { Shipment } from '../models/shipment'

export const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}`
export const PAGE_SIZE = 20


export type FetchPageResponse = {
  data: Shipment[]
  totalRecords: number
}

/* Get shipment data page by page number and other fields*/
const fetchShipmentPage = (
  pageNumber: number,
  sortColumn?: string,
  sortOrder?: string
): Promise<FetchPageResponse> => {
  const url = new URL(BASE_URL + 'shipments')
  url.searchParams.append('_page', String(pageNumber))
  url.searchParams.append('_sort', String(sortColumn))
  url.searchParams.append('_order', String(sortOrder))
  url.searchParams.append('_limit', String(PAGE_SIZE))

  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then(async (response: any) => {
        if (response.status === 200) {
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

/* Get shipment details */
const fetchShipmentDetail = (shipmentId: string): Promise<Shipment> => {
  const url = new URL(`${BASE_URL}shipments/${shipmentId}`)
  return new Promise((resolve, reject) => {
    fetch(url.href)
      .then(async (response: any) => {
        if (response.status === 200) {
          resolve(await response.json())
        }
        if (response.status === 404) {
          reject(`Cant find shipment with Id "${shipmentId}".`)
        } else {
          reject('Error occurred while fetching shipment.')
        }
      })
      .catch(() => reject('Error occurred while fetching shipments.'))
  })
}

/* update details (currently only name is updatable) */
const updateShipmentDetail = (shipmentId: string, shipment: Shipment) => {

  const url = new URL(`${BASE_URL}shipments/${shipmentId}`)
  return new Promise((resolve, reject) => {
    fetch(url.href, {
      method: 'put', /* PATCH is preferred here, but not working with json-server, so used PUT */
      body: JSON.stringify(shipment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          resolve(await response.json())
        }
        if (response.status === 404) {
          reject(`Cant find shipment with Id "${shipmentId}".`)
        } else {
          reject('Error occurred while updating shipment.')
        }
      })
      .catch(() => reject('Error occurred while updating shipments.'))
  })
}

export const api = {
  fetchShipmentPage,
  fetchShipmentDetail,
  updateShipmentDetail
}
