
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Shopping from './components/Shopping';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="App">
       <RouterProvider router={appRouter} />
    </div>
  );
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path : "/shopping/:resId",
    element: <Shopping />
  }
])

export default App;

