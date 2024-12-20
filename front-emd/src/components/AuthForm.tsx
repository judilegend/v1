import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/authSlice";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await dispatch(loginUser({ email, password }));
      navigate("/dashboard");
    } else {
      await dispatch(registerUser({ username, email, password }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-96"
      >
        <h2
          className="mb-6 text-2
xl font-bold text-center"
        >
          {isLogin ? "Login" : "Register"}
        </h2>
        {!isLogin && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Processing..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
          >
            {isLogin ? "Need an account?" : "Already have an account?"}
          </button>
        </div>
        {error && <p className="mt-4 text-xs italic text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
