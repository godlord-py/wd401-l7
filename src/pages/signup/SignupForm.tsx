import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import "./signup.css"
const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
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
    <div className="full-page-background">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="anime max-w-md mt-32 p-8 border border-gray-300 rounded-lg bg-white bg-opacity-10 mx-10"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">
          Welcome To <span className="text-red-500">SportsNewsPage</span>
        </h2>
        <p className="text-center p-2 text-white">Sign up to your account</p>
        <motion.div
          className="mb-4 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="name" className="block text-sm font-medium text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413 41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clipRule="evenodd" />
            </svg>
        
          </label>
          <input
            type="name"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter Name"
          />
        </motion.div>
        <motion.div
          className="mb-4 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
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
        </motion.div>
        <motion.div
          className="mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z" clipRule="evenodd" />
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
        </motion.div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Sign Up
        </motion.button>
        <motion.button
          type="button"
          className="bg-green-500 mt-4 text-white p-2 rounded-md w-full hover:bg-green-600"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Continue As Guest
        </motion.button>
        <p className="mt-4 text-center text-white">
          Already Have An Account? <Link to="/signin" className="text-blue-500">Login</Link>
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </motion.form>
      <div className="absolute top-60 right-40 p-8 text-white text-2xl font-bold">
        <p>
          <span className="rgb" style={{ color: 'red' }}>Where passion</span> meets play, and every victory tells a story.<br /> Welcome to
          SportsNewsPage,<br /> your gateway to the heartbeat of the game.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

