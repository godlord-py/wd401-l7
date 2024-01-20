import React , {useState}from "react"
import { Link , useNavigate} from "react-router-dom"
import { API_ENDPOINT } from "../../config/constants"

const SigninForm: React.FC = () => {
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {         
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: email, password: password}),
            });
            if(!response.ok) {
                throw new Error("Something went wrong while signing you in.");
            }
            console.log("signin success!"); 
            const data = await response.json();
            setEmail("");
            setPassword("");
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userData", JSON.stringify(data.user));
            navigate("/")
        }
        catch(error) {
            console.log("Sign in failed:",error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <div>
            <h2>Welcome To SportsNewsPage</h2>
            <p>Sign in to your account</p>
            <div>
                <label htmlFor="email">Email</label>
                <input type = "email" id = "email" name = "email" onChange={(e) => setEmail(e.target.value)}required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type = "password" id = "password" name = "password" onChange={(e) => setPassword(e.target.value)}required/>
            </div>
            <button>
                Sign In
            </button>

            <p>Don't Have An Account?</p>
            <Link to = "/signup">Sign Up</Link>
        </div>
    </form>

    )

}

export default SigninForm;