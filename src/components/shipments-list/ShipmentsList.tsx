/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, SyntheticEvent, useContext, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import './ShipmentList.css'

/* Shipment List Component. Uses Bulma CSS collection  for table styles */
export default function ShipmentsList(): ReactElement {
  const { shipmentsListState, fetchShipmentPage } = useContext(ShipmentContext)
  const [sortConfig, setSort] = useState<{
    column: string | undefined
    order: string
  }>({ column: 'id', order: 'asc' })

  const handleSort = useCallback((event: SyntheticEvent<HTMLElement>) => {
    const column = event.currentTarget.dataset.sortColumn
    if (column === sortConfig.column) {
      setSort({
        ...sortConfig,
        order: sortConfig.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSort({ ...sortConfig, column, order: 'asc' })
    }
  }, [sortConfig])

  useEffect(() => {
    fetchShipmentPage({
      sortColumn: sortConfig.column,
      sortOrder: sortConfig.order
    })
  }, [fetchShipmentPage, sortConfig])

  return (
    <>
      {shipmentsListState.loading ? 'Loading...' : null}
      {!shipmentsListState.loading && shipmentsListState.shipments.length ? (
        <>
          <table className='table is-bordered is-striped is-hoverable is-fullwidth sortable-table'>
            <thead>
              <tr>
                <th data-sort-column='id' onClick={handleSort}>
                  Id
                </th>
                <th data-sort-column='name' data-testid="nameheader" onClick={handleSort}>
                  Name
                </th>
                <th data-sort-column='mode' onClick={handleSort}>
                  Mode
                </th>
                <th data-sort-column='type' onClick={handleSort}>
                  Type
                </th>
                <th data-sort-column='origin' onClick={handleSort}>
                  Origin
                </th>
                <th data-sort-column='destination' onClick={handleSort}>
                  Destination
                </th>
                <th data-sort-column='status' onClick={handleSort}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {shipmentsListState.shipments.map(shipment => (
                <tr data-testid="shipmentrow" key={shipment.id}>
                  <td>
                    <Link to={`/shipment/${shipment.id}`} data-testid="shipmentid">{shipment.id}</Link>
                  </td>
                  <td data-testid="shipmentname">{shipment.name}</td>
                  <td>{shipment.mode}</td>
                  <td>{shipment.type}</td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                  <td>{shipment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  )
}
