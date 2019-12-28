/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { api } from '../../api/api'
import { Shipment } from '../../models/shipment'
import './ShipmentDetails.css'

/* Shipment Details Component */
export default function ShipmentDetails(): ReactElement {
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [error, setError] = useState('')

  /* Shipment id param from url */
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (id) {
      api
        .fetchShipmentDetail(id)
        .then(shipment => setShipment(shipment))
        .catch(() => {
          setError('Error: No shipment found.')
        })
    }
  }, [id])

  const updateShipmentName = useCallback(
    event => {
      api.updateShipmentDetail(id as string, shipment as Shipment)

      //navigate to home
      history.push('/')
    },
    [history, id, shipment]
  )

  return (
    <div className='container content-wrapper'>
      {/* {JSON.stringify(shipment)} */}
      {error && <div className='notification is-danger error'>{error}</div>}
      {!error && shipment && (
        <>
          <Link to='/'>
            <i className='fas fa-angle-double-left'></i> Back
          </Link>
          <div className='is-size-5'>
            Shipment details for id: <strong>{id}</strong>
          </div>
          <hr />
          <ReadOnlyField
            label='UserId'
            field={<span>{shipment.userId}</span>}
          />
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label' htmlFor='name'>
                Name
              </label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input
                    id='name'
                    name='name'
                    className={`input ${!shipment.name ? 'is-danger' : ''}`}
                    type='text'
                    placeholder='Enter Shipment Name'
                    value={shipment.name}
                    onChange={e =>
                      setShipment({ ...shipment, name: e.target.value })
                    }
                  />
                </div>
                {!shipment.name && (
                  <p className='help is-danger'>This field is required</p>
                )}
              </div>
            </div>
          </div>
          <ReadOnlyField
            label='Status'
            field={<span>{shipment.status}</span>}
          />
          <ReadOnlyField label='Mode' field={<span>{shipment.mode}</span>} />
          <ReadOnlyField label='Type' field={<span>{shipment.type}</span>} />
          <ReadOnlyField
            label='Origin'
            field={<span>{shipment.origin}</span>}
          />
          <ReadOnlyField
            label='Destination'
            field={<span>{shipment.destination}</span>}
          />
          <ReadOnlyField
            label='Services'
            field={
              <table className='table is-bordered'>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.services?.map(({ type, value }) => (
                    <tr key={type + value}>
                      <td>{type}</td>
                      <td>{value || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />
          <ReadOnlyField
            label='Cargo'
            field={
              <table className='table is-bordered'>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.cargo?.map(({ type, description, volume }) => (
                    <tr key={type + volume}>
                      <td>{type}</td>
                      <td>{description}</td>
                      <td>{volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />
          <ReadOnlyField label='Total' field={<span>{shipment.total}</span>} />

          <div className='field is-horizontal'>
            <div className='field-label'></div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <button
                    data-testid='updatebutton'
                    disabled={!shipment.name}
                    className='button is-primary'
                    onClick={updateShipmentName}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const ReadOnlyField = ({
  label,
  field
}: {
  label: string
  field: React.ReactElement
}) => {
  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label' htmlFor={label}>
          {label}
        </label>
      </div>
      <div className='field-body'>
        <div id={label} className='field readonly'>
          {field}
        </div>
      </div>
    </div>
  )
}
