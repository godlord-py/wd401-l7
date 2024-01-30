import { API_ENDPOINT } from "../../config/constants";

export const searchArticle = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_ARTICLE_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/articles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("data from server:", data)
        dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data});
    } catch (error) {
        dispatch({ type: "FETCH_ARTICLE_FAILURE", payload: error });
        console.log("Error:", error);

    }
};