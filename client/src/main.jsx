
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/userProvider.jsx'
import PlantProvider from './context/plantProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter>
      <UserProvider>
        <PlantProvider>
          <Routes />
        </PlantProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
// Take note for React.StrictMode for it might need to be deleted for certain dependencies 
// Don't forget to wrap Providers here

