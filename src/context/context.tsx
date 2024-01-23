import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { MatchAction, MatchReducer, initialState, MatchState } from "./reducer";

// Create contexts for Match state and dispatch
    const MatchStateContext = createContext<MatchState>(initialState);
    const MatchDispatchContext = createContext<Dispatch<MatchAction>>(() => {});

    export const MatchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(MatchReducer, initialState); 

    return (
        <MatchStateContext.Provider value={state}>
        <MatchDispatchContext.Provider value={dispatch}>
            {children}
        </MatchDispatchContext.Provider>
        </MatchStateContext.Provider>
    );
    };

    export const useMatchState = () => useContext(MatchStateContext);
    export const useMatchDispatch = () => useContext(MatchDispatchContext);
