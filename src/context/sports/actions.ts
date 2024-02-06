import { API_ENDPOINT } from "../../config/constants";

export const searchSport = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_SPORT_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/sports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("data from server(SPORTS):", data)
        
        dispatch({ type: "FETCH_SPORT_SUCCESS", payload: data.sports});
    } catch (error) {
        dispatch({ type: "FETCH_SPORT_FAILURE", payload: error });
        console.log("Error:", error);

    }
};