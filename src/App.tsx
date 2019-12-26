import React from 'react'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ShipmentsTracker } from './components/shipments-tracker/ShipmentsTracker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ShipmentsDetails from './components/shipments-details/ShipmentsDetails'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <Switch>
          <Route path='/shipment/:id'>
            <ShipmentsDetails />
          </Route>
          <Route exact>
            <ShipmentsTracker />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
