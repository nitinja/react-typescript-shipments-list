import React, { ReactElement } from 'react'

interface Props {}

export default function ShipmentsList({}: Props): ReactElement {
  return (
    <div>
      <table className='table is-bordered is-striped is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>
              <abbr title='Position'>Pos</abbr>
            </th>
            <th>Team</th>
            <th>
              <abbr title='Played'>Pld</abbr>
            </th>
            <th>
              <abbr title='Won'>W</abbr>
            </th>
            <th>
              <abbr title='Drawn'>D</abbr>
            </th>
            <th>
              <abbr title='Lost'>L</abbr>
            </th>
            <th>
              <abbr title='Goals for'>GF</abbr>
            </th>
            <th>
              <abbr title='Goals against'>GA</abbr>
            </th>
            <th>
              <abbr title='Goal difference'>GD</abbr>
            </th>
            <th>
              <abbr title='Points'>Pts</abbr>
            </th>
            <th>Qualification or relegation</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>20</th>
            <td>
              <a
                href='https://en.wikipedia.org/wiki/Aston_Villa_F.C.'
                title='Aston Villa F.C.'
              >
                Aston Villa
              </a>{' '}
              <strong>(R)</strong>
            </td>
            <td>38</td>
            <td>3</td>
            <td>8</td>
            <td>27</td>
            <td>27</td>
            <td>76</td>
            <td>−49</td>
            <td>17</td>
            <td>
              Relegation to the{' '}
              <a
                href='https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship'
                title='2016–17 Football League Championship'
              >
                Football League Championship
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav className='pagination' role='navigation' aria-label='pagination'>
        <button
          className='pagination-previous'
          title='This is the first page'
          disabled
        >
          Previous
        </button>
        <button className='pagination-next'>Next page</button>
        <ul className='pagination-list'>
          <li>
            <a
              className='pagination-link is-current'
              aria-label='Page 1'
              aria-current='page'
            >
              1
            </a>
          </li>
          <li>
            <a className='pagination-link' aria-label='Goto page 2'>
              2
            </a>
          </li>
          <li>
            <a className='pagination-link' aria-label='Goto page 3'>
              3
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
