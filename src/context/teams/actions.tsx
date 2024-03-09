import { API_ENDPOINT } from "../../config/constants";

export const searchTeam = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_TEAMS_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("data from server(TEAMS):", data)
        
        dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: data.teams});
    } catch (error) {
        dispatch({ type: "FETCH_TEAMS_FAILURE", payload: error });
        console.log("Error:", error);

    }
};