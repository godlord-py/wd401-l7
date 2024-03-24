import { API_ENDPOINT } from "../../config/constants";

export const searchMatch = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_MATCH_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/matches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }); 
        const data = await response.json();
        console.log("data from server:", data)
        
        dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches});
    } catch (error) {
        dispatch({ type: "FETCH_MATCH_FAILURE", payload: error });
        console.log("Error:", error);

    }
};