import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import EndPage from './pages/EndPage'

const router = createBrowserRouter([
  { path: '/', element: <StartPage /> },
  { path: '/game', element: <GamePage /> },
  { path: '/end', element: <EndPage /> }
])

export default function Router() {
  return <RouterProvider router={router} />
}
