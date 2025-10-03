import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import OffcanvasExample from './components/navbarOffCanvas.jsx'
import Footer from './components/footer.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <OffcanvasExample />
   
    <Footer />
  </StrictMode>,
)
