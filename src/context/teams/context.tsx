import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { TeamAction, TeamReducer, initialState, TeamState } from "./reducer";

// Create contexts for Team state and dispatch
    const TeamStateContext = createContext<TeamState>(initialState);
    const TeamDispatchContext = createContext<Dispatch<TeamAction>>(() => {});

    export const TeamProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(TeamReducer, initialState); 

    return (
        <TeamStateContext.Provider value={state}>
        <TeamDispatchContext.Provider value={dispatch}>
            {children}
        </TeamDispatchContext.Provider>
        </TeamStateContext.Provider>
    );
    };

    export const useTeamState = () => useContext(TeamStateContext);
    export const useTeamDispatch = () => useContext(TeamDispatchContext);
