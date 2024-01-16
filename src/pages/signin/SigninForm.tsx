import React from "react"
import { Link , useNavigate} from "react-router-dom"
import { API_ENDPOINT } from "../../config/constants"

const SigninForm: React.FC = () => {
    return (
        <div>
            <h2>Welcome To SportsNewsPage</h2>
            <p>Sign in to your account</p>
            <div>
                <label htmlFor="email">Email</label>
                <input type = "email" id = "email" name = "email" required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type = "password" id = "password" name = "password" required/>
            </div>
            <button>
                Sign In
            </button>

            <p>Don't Have An Account?</p>
            <Link to = "/signup">Sign Up</Link>
        </div>

    )

}

export default SigninForm;