import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import './signin.css'
const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong while signing you in.");
      }
      console.log("signin success!");
      const data = await response.json();
      setEmail("");
      setPassword("");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.log("Sign in failed:", error);
    }
  };
  
  return (
    <div className="full-page-background">
    <form
      onSubmit={handleSubmit}
      className="max-w-md mt-32 p-8 border border-gray-300 rounded-lg bg-black bg-opacity-50 mx-10"
      >
      <h2 className="text-3xl font-semibold mb-4 text-center text-white">
        Welcome To <div className="text-red-500">SportsNewsPage</div>
      </h2>
      <p className="text-center p-2 text-white">Sign in to your account</p>
      <div className="mb-4 flex items-center">
        <label htmlFor="email" className="block text-sm font-medium text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
          </svg>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 mr-1 p-2 w-full border rounded-md"
          placeholder="Enter Email"
        />
      </div>
      <div className="mb-6 flex items-center">
        <label htmlFor="password" className="block text-sm font-medium text-white">
        <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="w-5 h-5 mr-2">
  <path fillRule="evenodd" d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
   clipRule="evenodd" />
</svg>

        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md "
          placeholder="Enter Password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
      >
        Sign In
      </button>
      <p className="mt-4 text-center text-white">
        Don't Have An Account? <Link to="/signup" className="text-green-600">Sign Up</Link>
      </p>
    </form>
    <div className="hidden md:block">
        <img
          src="src/assets/sportgif.gif"  
          alt="sportgif"
          className="w-96 h-96 object-cover absolute right-80 top-80  transform -translate-y-1/3 rounded-full"
        />
      </div>
    </div>
  );
};

export default SigninForm;