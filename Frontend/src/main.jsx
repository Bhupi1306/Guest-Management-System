import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from '../components/Form'
import EntryForm from '../components/EntryForm.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" 
        element={
          <Form 
            fullName={true}
            backendUrl={`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`}
            type="Registeration"
            headerText="Create an Account"
          />
        } />
      <Route path="/login" 
        element={
          <Form 
            fullName={false}
            backendUrl={`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`}
            type="Login"
            headerText="Login"
          />
        } />

      <Route path="/home" 
        element={
          <EntryForm />
        } />
    </Routes>
  </BrowserRouter>,
)
