import { Toaster } from 'sonner'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { CreateRoomPage } from './pages/create-room';
import { RoomPage } from './pages/room';
import {  QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoomPage />,
  },    
  {
    path: "/room/:roomId",
    element: <RoomPage />,
  },
])

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster invert richColors/>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

