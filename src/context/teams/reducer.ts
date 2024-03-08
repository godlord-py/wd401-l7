import {Teams} from "../../types";

export interface TeamState {
  team: Teams[],
  isLoading: boolean,
  isError:  boolean,
  errorMessage: string,
}

export const initialState: TeamState = {
  team: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};
export type TeamAction =
  | { type: "FETCH_TEAMS_REQUEST" }
  | { type: "FETCH_TEAMS_SUCCESS"; payload: Teams[] }
  | { type: "FETCH_TEAMS_FAILURE"; payload: string };

export const TeamReducer = (
    state: TeamState = initialState,
    action: TeamAction
    ) => {
    switch (action.type) {
        case "FETCH_TEAMS_REQUEST":
        return {
            ...state,
            isLoading: true,
            isError: false,
        };
        case "FETCH_TEAMS_SUCCESS":
        return {
            ...state,
            isLoading: false,
            isError: false,
            teams: action.payload,
        };
        case "FETCH_TEAMS_FAILURE":
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