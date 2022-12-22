import React, { useState } from "react";
import { useNavigate, Link } from "@shopify/hydrogen/client";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "vomefan742@subdito.com",
    password: "hello123",
  });
  const [error, setError] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await callLoginApi(credentials);
    console.log(response);
    if (response?.error) {
      setError(true);
    } else {
      navigate("/account");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await fetch("/account/forgotpassword", {
        method: "POST",
        body: JSON.stringify(credentials.email),
      });
      const data = await res.json();
      if (data?.message) {
        setForgotPasswordMessage({ ...data });
        return;
      }
      setForgotPasswordMessage({ message: "Check your email" });
    } catch (error) {}
  };
  return (
    <section className="flex items-center justify-center h-[calc(100vh-6rem)] bg-gray-100">
      <div className="px-8 py-3 mx-4 mt-4 text-left bg-white shadow-lg lg:w-2/5 sm:w-1/2 border">
        <pre>email: salilase@finews.biz password: hello123456</pre>
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className="lowercase w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
                value={credentials?.email}
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                  setError();
                }}
              />
              <p className="text-red-500">{error?.email}</p>
            </div>
            <div className="mt-4">
              <label className="block">
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                  value={credentials?.password}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                    setError();
                  }}
                />
                <p className="text-red-500">{error?.password}</p>
              </label>
            </div>
            <p
              onClick={handleForgotPassword}
              className="text-blue-500 text-sm underline text-right"
            >
              Forgot password!
            </p>
            {error ? (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email or password
              </p>
            ) : null}
            <p className="text-red-500 text-xs italic">
              {forgotPasswordMessage?.message}
            </p>
            <div className="flex">
              <button className="uppercase w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                login
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Already have an account?{" "}
              <Link
                to="account/signup"
                className="text-blue-600 hover:underline underline-offset-2 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;

export async function callLoginApi(credentials) {
  try {
    const res = await fetch(`/account/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (error) {
    console.log(error);
    return {
      error: error.toString(),
    };
  }
}
