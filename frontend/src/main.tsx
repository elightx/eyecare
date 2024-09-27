import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { Provider as JotaiProvider } from 'jotai'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '@/App.tsx'
import Shop from '@/pages/shop'
import Products from '@/pages/shop/products.tsx'
import ProductPage from '@/pages/product'
import Login from '@/pages/login'
import SignUp from '@/pages/signup'
import Cart from '@/pages/cart'
import Wishlist from '@/pages/wishlist'
import Profile from './pages/profile'
import Orders from './pages/orders'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window {
    Razorpay: any
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/shop',
    element: <Shop />,
  },
  {
    path: '/shop/:category',
    element: <Products />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <RouterProvider router={router} />
    </JotaiProvider>
  </React.StrictMode>,
)
