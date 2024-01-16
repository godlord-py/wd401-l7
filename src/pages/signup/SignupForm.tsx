import React from "react";
import {Link , useNavigate} from "react-router-dom";

const SignupForm: React.FC = () => {
    return (
        <div>
            <h2>Welcome To SportsNewsPage</h2>
            <p>Sign in to your account</p>
            <div>
                <label htmlFor="name">Name: </label>
                <input type = "name" id = "name" name = "name" required/>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type = "email" id = "email" name = "email" required/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type = "password" id = "password" name = "password" required/>
            </div>
            <button>
                Sign Up
            </button>
        </div>

    )
}

export default SignupForm;