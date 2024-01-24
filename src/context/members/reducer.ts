import {Matches} from "../../types";

export interface MatchState {
  matches: Matches[],
  isLoading: boolean,
  isError:  boolean,
  errorMessage: string,
}

export const initialState: MatchState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export type MatchAction =
  | { type: "FETCH_MATCH_REQUEST" }
  | { type: "FETCH_MATCH_SUCCESS"; payload: Matches[] }
  | { type: "FETCH_MATCH_FAILURE"; payload: string };

export const MatchReducer = (
    state: MatchState = initialState,
    action: MatchAction
    ) => {
    switch (action.type) {
        case "FETCH_MATCH_REQUEST":
        return {
            ...state,
            isLoading: true,
            isError: false,
        };
        case "FETCH_MATCH_SUCCESS":
        return {
            ...state,
            isLoading: false,
            isError: false,
            matches: action.payload,
        };
        case "FETCH_MATCH_FAILURE":
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