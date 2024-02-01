// MyContext.js

import React, { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState()

  return (
    <MyContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => useContext(MyContext)
