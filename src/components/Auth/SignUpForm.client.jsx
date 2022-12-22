import React, { useState } from "react";
import { useNavigate, Link } from "@shopify/hydrogen/client";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  acceptsMarketing: true,
};

const SignUpForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState(initialValues);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await callSignUpApi(credentials);
    if (response) {
      setError(response);
    } else {
      navigate("/account");
    }
  };

  return (
    <section className="flex items-center justify-center h-[calc(100vh-6rem)] bg-gray-100">
      <div className="px-8 py-3 mx-4 mt-4 text-left bg-white shadow-lg lg:w-2/4 sm:w-2/3 border">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>
        <p className="text-red-500">{error?.error}</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="flex gap-4">
              <div>
                <label className="block" htmlFor="firstName">
                  First Name
                  <input
                    type="text"
                    placeholder="First Name"
                    className="capitalize w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                    value={credentials?.firstName}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        firstName: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div>
                <label className="block" htmlFor="lastName">
                  Last Name
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="capitalize w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    required
                    value={credentials?.lastName}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        lastName: e.target.value,
                      });
                      setError();
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Phone
              </label>
              <input
                type="text"
                placeholder="+911234567891"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
                value={credentials?.phone}
                onChange={(e) => {
                  setCredentials({ ...credentials, phone: e.target.value });
                  setError();
                }}
              />
              <p className="text-red-500">{error?.phone}</p>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                placeholder="abc@gmail.com"
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
            <div className="flex">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Already have an account?{" "}
              <Link
                to="account/login"
                className="text-blue-600 hover:underline underline-offset-2 font-medium"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;

export async function callSignUpApi(credentials) {
  console.log(credentials);
  try {
    const res = await fetch(`/account/signup`, {
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
    return {
      error: error.toString(),
    };
  }
}
