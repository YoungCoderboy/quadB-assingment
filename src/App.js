import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios, { all } from 'axios'
import Loader from './component/Loader'
import Stars from './component/Stars'
import Lp from './Lp'
import Info from './Info'
import { MyContextProvider } from './MyContext'
const App = () => {
  return (
    <div className="App">
      <Router>
        <MyContextProvider>
          <Routes>
            <Route path="*" element={<Lp />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </MyContextProvider>
      </Router>
    </div>
  )
}
export default App
