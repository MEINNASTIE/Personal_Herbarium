import axios from "axios";
import COVER_VIDIO from "../assets/flower2.mp4";
import COVER_LOGO from "../assets/test.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faShield } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../utils/api.js"
import { UserContext } from "../context/userProvider.jsx"

export default function Login() {
  const { login, setUserTheme } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (!response.success) {
        setError(response.error);
      } else {
        const userId = response.user._id;
        const themeResponse = await axios.get(`${baseUrl}/auth/${userId}/theme`, {
          headers: {
            Authorization: `Bearer ${response.token}`
          }
        });

        if (themeResponse.data.theme) {
          setUserTheme(themeResponse.data.theme); 
        }

        navigate('/');
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex p-10  items-center justify-center">
    
    <div className="rounded-l-2xl relative flex flex-col justify-center h-4/5 w-2/5 ">
      <div className="absolute top-[20%] left-[10%] flex flex-col ">
        <h1 className="text-5xl text-white font-extrabold my-4">
          Create And Get Information <br /> About Your Favorite Flowers
        </h1>
        <p className="text-xl text-white font-normal">
          Adopt the peace of nature
        </p>
      </div>
      <video className="rounded-l-2xl w-full h-full object-cover" autoPlay loop muted>
        <source src={COVER_VIDIO} type="video/mp4" />
      </video>

      <div className="footerDiv justify-between w-3/4 rounded-xl flex absolute bottom-10 p-5 ml-20 h-20 shadow-2xl bg-slate-100/50">
        <span className="text text-gray-700 text-lg font-extrabold"> Don&apos;t have an account?</span>
        <Link to={"/register"}>
        <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4   text-sm font-medium rounded-xl text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
           Sign up
          </button>
        </Link>
      </div>
    </div>

    <div className="rounded-r-2xl bg-[#E0E0E0] flex flex-col justify-center p-4 w-2/5 h-4/5">

      <div className=" flex justify-center items-center flex-col">
        <img src={COVER_LOGO} className="w-40 h-40 flex "  />
      <h1 className=" font-extrabold text-3xl text-gray-500">Welcome  Herbarium </h1>
      </div>
      <form className="mt-8 space-y-6 w-4/5 pl-20" onSubmit={handleSubmit}>
        <div className="email-wrapper">
          <label htmlFor="email" className="sr-only item-center"></label>
          <span className="email-icon">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ position: "absolute" }}
            />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="email appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="email-wrapper">
          <label htmlFor="password" className="sr-only"></label>
          <span className="email-icon">
            <FontAwesomeIcon
              icon={faShield}
              style={{ position: "absolute" }}
            />
          </span>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className=" email appearance-none  min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <p>{error}</p>
          <button
            type="submit"
            className="group  items-center min-h-12 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </div>

                <div>Forgot your password? </div>
      </form>
    </div>
    </div>
  );
}
