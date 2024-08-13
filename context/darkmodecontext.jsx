import { createContext, useReducer } from 'react'
import DarkModeReducer from './DarkModeReducer.js'

const initial_state = {
    darkMode: false
}

export const DarkModeContext = createContext(initial_state)
export const DarkModeContextProvider = ({child}) => {
    const [ state, dispatch ] = useReducer(DarkModeReducer, initial_state)
    return(
        <DarkModeContext.Provider value={{darkMode: state.darkMode, dispatch}}>{child}</DarkModeContext.Provider>
    )
}