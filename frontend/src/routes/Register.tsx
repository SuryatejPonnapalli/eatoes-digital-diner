import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegsiter = async (e: any) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        { name: name, email: email, password: password },
        { withCredentials: true }
      );
      console.log(response);
      console.log("Status", response.status);
      if (response.status === 200) {
        console.log("Here");
        navigate("/login");
      }
    } catch (error: any) {
      if (error.status === 400) {
        alert("Email already exists.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl drop-shadow-2xl">
        <h2 className="text-3xl font-semibold text-black text-center mb-6">
          Signup
        </h2>
        <form onSubmit={handleRegsiter}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-black text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF]"
              placeholder="Enter your name"
              required
            />
          </div>
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
              min={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A8E6CF] text-black py-3 rounded-lg text-lg font-semibold hover:bg-[#8bc7a4] transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
