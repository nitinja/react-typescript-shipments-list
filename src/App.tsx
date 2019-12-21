import React from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ShipmentsTracker } from './components/shipments-tracker/ShipmentsTracker';

const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
     <ShipmentsTracker     />
      <Footer />
    </div>
  )
}

export default App
