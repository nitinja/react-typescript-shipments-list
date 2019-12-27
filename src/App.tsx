import React, { Suspense, lazy } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const ShipmentDetails = lazy(() =>
  import('./components/shipments-details/ShipmentsDetails')
)
const ShipmentsTracker = lazy(() =>
  import('./components/shipments-tracker/ShipmentsTracker')
)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='/shipment/:id'>
              <ShipmentDetails />
            </Route>
            <Route exact>
              <ShipmentsTracker />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
