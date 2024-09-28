
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './Routes'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query/reactQuery'

function App() {


  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
