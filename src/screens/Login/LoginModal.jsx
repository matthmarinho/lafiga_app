import React, { useState } from 'react'
import api from "../../services/api";
import { login } from "../../services/auth";

import Body from '../Body/Body'

export const sendToken = (token) => token;
export const sendUserInfo = (info) => info;

export default function LoginModal({showModal, setShowModal}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log(e);
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/authenticate", { email, password });
        sendUserInfo(response.data.user_info);
        login(response.data);
        sendToken(response.data.auth_token);
        // props.history.push("/");
      } catch (err) {
        setError(
          "Houve um problema com o login, verifique suas credenciais ou crie uma conta"
        );
      }
    }
  };

    return (
      showModal &&
      <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8" style={{marginTop: 100}}>
        <div className="max-w-md w-full space-y-10 border-2 border-gray-200 bg-black border-opacity-60 rounded-lg p-6">
          <button class="mt-0 text-gray-100" onClick={() => setShowModal(prev => !prev)}>x</button>
          <div>
            <img
              className="mx-auto rounded-lg h-30 w-auto"
              src="https://media.discordapp.net/attachments/583492070644383777/869017329109979156/Logo_Marca_final.jpeg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Entre com sua conta</h2>
            <p className="mt-2 text-center text-sm text-gray-100">
              Ou{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                crie sua conta
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            {error && <p className="text-gray-100 text-center">{error}</p>}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-">
                  Lembrar
                </label>
              </div>
  
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu a senha?
                </a>
              </div>
            </div>
  
            <div>
              <button
                tyoe="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }