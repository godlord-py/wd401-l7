import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong while signing you up.");
      }

      const data = await response.json();
      console.log("signup success!");
      setName("");
      setEmail("");
      setPassword("");
      setError(null); // Reset any previous errors
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/signin");
    } catch (error) {
      console.error("Sign up failed:", error.message);
      setError(error.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Welcome To SportsNewsPage</h2>
        <p>Sign up here!</p>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <label htmlFor="name">Name: </label>
          <input type="name" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already Have An Account?</p>
        <Link to = "/signin">Sign In</Link>
      </div>
    </form>
  );
}

export default SignupForm;
