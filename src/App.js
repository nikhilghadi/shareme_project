import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './container/Home'
import Login from './components/Login'
import { fetchUser } from './utils/fetchUser';

function App() {
  const user = fetchUser()
  return (
    <Routes>
        <Route path='Login' element={<Login/>}/>
        <Route path='/*' element={<Home/>}/>

    </Routes>
  )
}

export default App