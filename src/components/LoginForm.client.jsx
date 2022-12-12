import React, { useState } from "react";
import { useNavigate, Link } from "@shopify/hydrogen/client";

const LoginForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const email = "johnsmi@shopify.com";
  const password = "5hopify";

  async function submit(e) {
    e.preventDefault();
    console.log("submit");
    const response = await callLoginApi({
      email,
      password,
    });
    console.log(response);
    if (response.error) {
      setError(true);
    } else {
      navigate("/");
    }
  }
  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-1/3 border"
      >
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
          {error ? (
            <p className="text-red text-xs italic">Please choose a password.</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

export async function callLoginApi(email, password) {
  try {
    const res = await fetch(`/account/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email, password),
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
