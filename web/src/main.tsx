import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ProductProvider } from './context/ProductContext.tsx'
import { UserProvider } from './context/UserContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
)
