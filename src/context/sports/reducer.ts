import {Sports} from "../../types";

export interface SportState {
  sports: Sports[],
  isLoading: boolean,
  isError:  boolean,
  errorMessage: string,
}

export const initialState: SportState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export type SportAction =
  | { type: "FETCH_SPORT_REQUEST" }
  | { type: "FETCH_SPORT_SUCCESS"; payload: Sports[] }
  | { type: "FETCH_SPORT_FAILURE"; payload: string };

export const SportReducer = (
    state: SportState = initialState,
    action: SportAction
    ) => {
    switch (action.type) {
        case "FETCH_SPORT_REQUEST":
        return {
            ...state,
            isLoading: true,
            isError: false,
        };
        case "FETCH_SPORT_SUCCESS":
        return {
            ...state,
            isLoading: false,
            isError: false,
            sports: action.payload,
        };
        case "FETCH_SPORT_FAILURE":
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