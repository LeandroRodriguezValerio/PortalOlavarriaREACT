import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { Navbar } from './components/navbar.jsx'
import OffcanvasExample from './components/navbarOffCanvas.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <OffcanvasExample />
   
    
  </StrictMode>,
)
