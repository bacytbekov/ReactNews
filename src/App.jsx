import { useEffect, useState} from 'react'
import axios from "axios";
import Login from "./components/login.jsx";
import { Routes, Route } from 'react-router-dom'

import ManagerLayout from "./rols/manager/ManagerLayout.jsx";
import ManagerDashboard from "./rols/manager/ManagerDashboard.jsx";
import NewsDetail from "./components/NewsDetail.jsx";
function App() {

  return (
    <>
      <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/manager" element={<ManagerLayout/>} >
              <Route index  element={<ManagerDashboard/>}/>
              <Route  path="news/:id"  element={<NewsDetail/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
