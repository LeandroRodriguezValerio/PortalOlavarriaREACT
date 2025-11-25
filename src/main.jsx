import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ayuda from './components/Paginas/Ayuda/Ayuda.jsx';
import Mascotas from './components/Paginas/Mascotas/Mascotas.jsx';
import Home from './components/Paginas/Home/Home.jsx';
import Compartido from './components/Paginas/Compartido/Compartido.jsx';
import Login from './components/Paginas/Login/login.jsx';
import Registro from './components/Paginas/Registro/Registro.jsx';
import Perfil from './components/Paginas/Perfil/perfil.jsx';

const Router = createBrowserRouter([
  { 
    path: "/",
    element: <Compartido />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      {
        path:'mascotas',
        element: <Mascotas />
      },
      {
        path: "ayuda",
        element: <Ayuda />
      },
      {
        path: "login",
        element: <Login /> 
      },
      {
        path: "registro",
        element: <Registro />
      },
       {
        path: "perfil",
        element: <Perfil />
      }
    ]
   },
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />  
  </StrictMode>,
)
