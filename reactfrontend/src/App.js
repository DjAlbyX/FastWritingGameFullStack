import StartPage from './components/StartPage.js';
import Game from './components/Game.js'
import './Game.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";


export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <StartPage />
    },
    {
      path: "/Game",
      element: <Game />
    }
  ])
  return (
    <>
    <RouterProvider router={route} />
    </>
  );
}

