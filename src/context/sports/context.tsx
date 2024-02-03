import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { SportAction, SportReducer, initialState, SportState } from "./reducer";

// Create contexts for Sport state and dispatch
    const SportStateContext = createContext<SportState>(initialState);
    const SportDispatchContext = createContext<Dispatch<SportAction>>(() => {});

    export const SportProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(SportReducer, initialState); 

    return (
        <SportStateContext.Provider value={state}>
        <SportDispatchContext.Provider value={dispatch}>
            {children}
        </SportDispatchContext.Provider>
        </SportStateContext.Provider>
    );
    };

    export const useSportState = () => useContext(SportStateContext);
    export const useSportDispatch = () => useContext(SportDispatchContext);
