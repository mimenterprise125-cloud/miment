import React from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { AuthProvider } from '@/lib/auth-context'
import { RefreshProvider } from '@/lib/refresh-context'

// Create the router
const router = createRouter({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <AuthProvider>
      <RefreshProvider>
        <RouterProvider router={router} />
      </RefreshProvider>
    </AuthProvider>
  )
}

