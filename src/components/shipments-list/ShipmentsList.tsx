/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement, useContext, useState, SyntheticEvent, useEffect } from 'react';
import { Shipment } from '../../models/shipment';
import { ShipmentContext } from '../shipments-tracker/ShipmentsTracker';
import './ShipmentList.css'

export default function ShipmentsList({}): ReactElement {
  const {state, fetchShipmentPage, dispatch} = useContext(ShipmentContext);
  const [sortConfig, setSort] = useState<{column: string | undefined, order: string}>({column: 'id', order: 'asc'})
  const handleSort = (event: SyntheticEvent<HTMLElement>) => {
    // debugger
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
    fetchShipmentPage({sortColumn: sortConfig.column, sortOrder: sortConfig.order})
  }, [fetchShipmentPage, sortConfig])

  return (
    <>
      {/* {loading ? <i className='fas fa-spinner fa-spin fa-2x'></i> : null} */}
      {state.loading ? 'Loading...' : null}

      {!state.loading && state.shipments.length ? (
        <>
          {/* {JSON.stringify(shipments)} */}
          <table className='table is-bordered is-striped is-hoverable is-fullwidth sortable-table'>
            <thead>
              <tr>
                <th data-sort-column="id" onClick={handleSort}>Id</th>
                <th data-sort-column="name" onClick={handleSort}>Name</th>
                <th data-sort-column="mode" onClick={handleSort}>Mode</th>
                <th data-sort-column="type" onClick={handleSort}>Type</th>
                <th data-sort-column="origin" onClick={handleSort}>Origin</th>
                <th data-sort-column="destination" onClick={handleSort}>Destination</th>
                <th data-sort-column="status" onClick={handleSort}>Status</th>
                {/* <th>Total</th> */}
                {/* <th>UserId</th> */}
              </tr>
            </thead>
            <tbody>
              {state.shipments.map(shipment => (
                <tr key={shipment.id}>
                  <td>{shipment.id}</td>
                  <td>{shipment.name}</td>
                  <td>{shipment.mode}</td>
                  <td>{shipment.type}</td>
                  <td>{shipment.origin}</td>
                  <td>{shipment.destination}</td>
                  {/* <td>{shipment.total}</td> */}
                  <td>{shipment.status}</td>
                  {/* <td>{shipment.userId}</td> */}
                </tr>
              ))}
            </tbody>
          </table>

        </>
      ) : null}
      {/* {!loading && !shipments.length && <div>No Data. </div>} */}
    </>
  )
}
