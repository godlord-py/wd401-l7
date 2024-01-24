import React from "react";
import SigninForm from "./SigninForm";

const Signin: React.FC = () => {
    return (
        <div>
            <h1 className="text-green-600">Sign In</h1>
            <SigninForm/>
        </div>
    )
}

export default Signin;