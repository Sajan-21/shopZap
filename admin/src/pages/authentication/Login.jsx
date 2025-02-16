import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from '../../components/common-things/CommonThings'
import axios from 'axios'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();

    async function handleLogin(e) {
        try {
            e.preventDefault();
            let response = await axios.post(`${backendURL}/login`,{
                email,
                password
            });
            setLoginData(response.data.data);
            navigate(`/dashboard/${response.data.data._id}`);
        } catch (error) {
            console.log("error while handleLogin : ",error);
        }
    }
    console.log("loginData : ",loginData);

    localStorage.setItem(loginData._id, loginData.token);

  return (
    <div>
      <div className="p-10 grid grid-cols-2 max-lg:grid-cols-1 login-bg-img bg-cover bg-no-repeat h-screen">
        <div className="border flex justify-center items-center  backdrop-blur-xl p-10">
          <form className="w-3/4 flex flex-col gap-5 max-md:w-4/5 max-sm:w-full" onSubmit={handleLogin}>
            <div className="mb-10 text-center">
              <h1 className="logo-font text-white text-4xl">Welcome back!</h1>
              <p className="text-white">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
              onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-white p-2 rounded-full text-white"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border border-white p-2 rounded-full text-white"
              />
              <Link
                to="/email-confirmation"
                className="hover:text-white hover:underline text-sm text-end"
              >
                forgot password ?
              </Link>
            </div>
            <div className="">
              <input
                type="submit"
                value="Submit"
                className="bg-green-800 text-white w-full rounded-full py-2 cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div className="border max-lg:hidden login-inner-bg bg-no-repeat bg-cover flex flex-col justify-center items-center p-10 gap-5">
          <div className="logo-font text-9xl text-center text-yellow-900 text-wrap max-xl:text-8xl">
            shopZap
          </div>
          <div className="text-2xl text-lime-900 font-bold">
            Choose Green, Live Clean
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
