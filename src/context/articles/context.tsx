import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { ArticleAction, ArticleReducer, initialState, ArticleState } from "./reducer";

// Create contexts for Article state and dispatch
    const ArticleStateContext = createContext<ArticleState>(initialState);
    const ArticleDispatchContext = createContext<Dispatch<ArticleAction>>(() => {});

    export const ArticleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(ArticleReducer, initialState); 

    return (
        <ArticleStateContext.Provider value={state}>
        <ArticleDispatchContext.Provider value={dispatch}>
            {children}
        </ArticleDispatchContext.Provider>
        </ArticleStateContext.Provider>
    );
    };

    export const useArticleState = () => useContext(ArticleStateContext);
    export const useArticleDispatch = () => useContext(ArticleDispatchContext);
