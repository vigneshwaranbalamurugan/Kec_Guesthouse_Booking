import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import HallDetails from './pages/HallDetails';
import Departments from './pages/Department'
import CategoryHalls from './pages/CategoryHalls';
import DeptHalls from './pages/DeptHalls';
import Table from './pages/Table';
import DepAllDetails from './pages/Halls/DepAllDetails';
import Admin from './components/Admin';
import Tabl from './pages/Calender';


const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<Layout/>,
      errorElement:<ErrorPage/>,
      children:[
        {index:true, element:<Home />},
        {path:"/halls/:id",element:<HallDetails />},
        {path:"/loginsignup",element:<LoginSignup />},
        {path:"/departments",element:<Departments/>},
        {path:"/dashboard",element:<Dashboard />},
        {path:"/profile/:id",element:<UserProfile />},
        {path:"/halls/categories/:category",element:<CategoryHalls />},
        {path:"/halls/user/:id",element:<DeptHalls />},
        {path:"/dephalldetails/:id",element:<Table/>},
        {path:"/depalldetails/:id",element:<DepAllDetails/>},
        {path:"/admin",element:<Admin/>},
        {path:"/calender",element:<Tabl/>},
      ]
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);