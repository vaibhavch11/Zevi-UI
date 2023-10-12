
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Shopping from './components/Shopping';

function App() {
  return (
    <div className="App">
       <Outlet />
    </div>
  );
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path : "/shopping/:resId",
        element: <Shopping />
      }
    ]
  }
])

export default App;
