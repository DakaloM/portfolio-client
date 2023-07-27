import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import "./index.scss"

function App() {

  const Layout = () => {
    return (
      <div
      style={{
        maxWidth: "1920px", margin: "0 auto",
        display: "flex",
      }}>
        
        
          <Leftbar />

          <div className="main-container">

            <Navbar />
            <Outlet />
          </div>

          <Rightbar />
       
      </div>
    )
  }

  const router= createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        {path: "/", element: <Home />}
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
