/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker'
import './ShipmentList.css'

/* Shipment List Component. Uses Bulma CSS collection  for table styles */
export default function ShipmentsList(): ReactElement {
  const { state, fetchShipmentPage } = useContext(ShipmentContext)
  const [sortConfig, setSort] = useState<{
    column: string | undefined
    order: string
  }>({ column: 'id', order: 'asc' })
  const handleSort = (event: SyntheticEvent<HTMLElement>) => {
    const column = event.currentTarget.dataset.sortColumn
    if (column === sortConfig.column) {
      setSort({
        ...sortConfig,
        order: sortConfig.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSort({ ...sortConfig, column, order: 'asc' })
    }
  }

  useEffect(() => {
    fetchShipmentPage({
      sortColumn: sortConfig.column,
      sortOrder: sortConfig.order
    })
  }, [fetchShipmentPage, sortConfig])

  return (
    <>
      {state.loading ? 'Loading...' : null}
      {!state.loading && state.shipments.length ? (
        <>
          <table className='table is-bordered is-striped is-hoverable is-fullwidth sortable-table'>
            <thead>
              <tr>
                <th data-sort-column='id' onClick={handleSort}>
                  Id
                </th>
                <th data-sort-column='name' onClick={handleSort}>
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
              {state.shipments.map(shipment => (
                <tr key={shipment.id}>
                  <td>
                    <Link to={`/shipment/${shipment.id}`}>{shipment.id}</Link>
                  </td>
                  <td>{shipment.name}</td>
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
