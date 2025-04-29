import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        { email: email, password: password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (location.state === "/checkout") {
          navigate("/checkout");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      if (error.status === 403) {
        alert("Wrong password.");
      }
      if (error.status === 404) {
        alert("Register first.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl drop-shadow-2xl">
        <h2 className="text-3xl font-semibold text-black text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A8E6CF] text-black py-3 rounded-lg text-lg font-semibold hover:bg-[#8bc7a4] transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-2">
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Signup
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
