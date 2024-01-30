import {Articles} from "../../types";

export interface ArticleState {
  articles: Articles[],
  isLoading: boolean,
  isError:  boolean,
  errorMessage: string,
}

export const initialState: ArticleState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export type ArticleAction =
  | { type: "FETCH_ARTICLE_REQUEST" }
  | { type: "FETCH_ARTICLE_SUCCESS"; payload: Articles[] }
  | { type: "FETCH_ARTICLE_FAILURE"; payload: string };

export const ArticleReducer = (
    state: ArticleState = initialState,
    action: ArticleAction
    ) => {
    console.log('Dispatched Action:', action);
    switch (action.type) {
        case "FETCH_ARTICLE_REQUEST":
        return {
            ...state,
            isLoading: true,
         
        };
        case "FETCH_ARTICLE_SUCCESS":
        return {
            ...state,
            isLoading: false,
            articles: action.payload,
        };
        case "FETCH_ARTICLE_FAILURE":
        return {
            ...state,
            isLoading: false,
            isError: true,
            errorMessage: action.payload,
        };
        default:
        return state;
    }
    }