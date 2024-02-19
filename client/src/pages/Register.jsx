import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../utils/api.js"


export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [theme, setTheme] = useState('light'); 

    const body = {
      theme
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Make a POST request to your server's register endpoint
          const response = await axios.post(`${baseUrl}/auth/register`, { name, email, password, theme });
          // theme handler set to body 
          body,
          { headers: { 'Content-Type': 'application/json' } }

          // Check if 'response' is defined before accessing 'data'
          if (response && response.data) {
            // Handle the response accordingly (e.g., set user state, redirect, etc.)
            console.log(response.data);
            if(response.status === 200){
            console.log('Registration successful:', response.data);
            navigate('/login');
            } 
          } else {
            console.error('Unexpected response:', response);
          }
        } catch (error) {
          console.error('Registration failed:', error.response?.data?.error || 'Unknown error');
        }
      };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {/* We change the name themes later to fit our aesthetics ;) */}
              <label>Select Theme</label>
              <div className="flex justify-center gap-3">
                <span
                  onClick={() => setTheme("default")}
                  className={`rounded-md border-gray-300 bg-indigo-600 p-2 cursor-pointer ${
                    theme === "default" ? "bg-gray-600 text-white" : ""
                  }`}
                >
                  Default
                </span>
                <span
                  onClick={() => setTheme("green")}
                  className={`rounded-md border-gray-300 bg-indigo-600 p-2 cursor-pointer ${
                    theme === "green" ? "bg-gray-600 text-white" : ""
                  }`}
                >
                  Green
                </span>
                <span
                  onClick={() => setTheme("dark")}
                  className={`rounded-md border-gray-300 bg-indigo-600 p-2 cursor-pointer ${
                    theme === "dark" ? "bg-gray-600 text-white" : ""
                  }`}
                >
                  Dark
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Register;


