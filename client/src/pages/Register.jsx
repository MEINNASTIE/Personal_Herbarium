import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { faEnvelope, faShield } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COVER_LOGO from "../assets/test.png";
import COVER_VIDIO from "../assets/green.mp4";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const [theme, setTheme] = useState("light");

  const photoDivRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;


  const navigate = useNavigate();
const handleSetPhotoInput = (photo) => {  
  setPhoto(photo);
  photoDivRef.current.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server's register endpoint


      const body = new FormData();
        body.append("name", name);
        body.append("email", email);
        body.append("password", password);
        if (photo){
          body.append("photo", photo);
        }   
        body.append("theme", theme);
   
      
      const response = await axios.post(`${baseUrl}/auth/register`, body);
      // theme handler set to body
      body, { headers: { "Content-Type": "application/json" } };

      // Check if 'response' is defined before accessing 'data'
      if (response && response.data) {
        // Handle the response accordingly (e.g., set user state, redirect, etc.)
        console.log(response.data);
        if (response.status === 200) {
          console.log("Registration successful:", response.data);
          navigate("/login");
        }
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.message || "Unknown error"
      );
    }
  };

  return (
    <div className="w-full h-screen flex p-10  items-center justify-center">
      <div className="rounded-l-2xl relative flex flex-col justify-center w-2/5  h-[70rem]
       ">
        <div className="absolute top-[20%] left-[10%] flex flex-col ">
          <h1 className="text-5xl text-white font-extrabold my-4">
            Create And Get Information <br /> About Your Favorite Flowers
          </h1>
          <p className="text-xl text-white font-normal">
            Adopt the peace of nature
          </p>
        </div>
        <video
          className="rounded-l-2xl w-auto  h-[70rem]  object-cover"
          autoPlay
          loop
          muted
        >
          <source src={COVER_VIDIO} type="video/mp4" />
        </video>

        <div className="footerDiv justify-between w-3/4 rounded-xl flex absolute bottom-10 p-5 ml-20 h-20 shadow-2xl bg-slate-100/50">
          <span className="text  text-gray-700 font-extrabold text-lg">
            Have an account?
          </span>
          <Link to={"/login"}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4   text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login
            </button>
          </Link>
        </div>
      </div>

      <div className="rounded-r-2xl bg-[#E0E0E0] flex flex-col justify-center p-4  w-2/5   h-[70rem]">
        <div className=" flex justify-center items-center flex-col">
          <img src={COVER_LOGO} className="w-40 h-40 flex " />
          <h1 className=" font-extrabold text-3xl text-gray-500">
            Let Us Know You!
          </h1>
        </div>
        <form className="mt-8 space-y-8  w-4/5 pl-20 " onSubmit={handleSubmit}>
        <div ref={photoDivRef} className="bg-cover w-[8rem] h-[8rem] flex justify-center items-center m-auto rounded-full bg-gray-100 ">
            <label htmlFor="photo" className="opacity-5 text-8xl flex justify-center items-center">
            <FontAwesomeIcon
              icon={faCamera}
              style={{ position: "absolute" }}
            />
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={(e) => handleSetPhotoInput(e.target.files[0])}
              className="hidden"
            />
          </div>
          <div>
            <label htmlFor="name" className="sr-only ">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
              className="appearance-none rounded-xl  min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
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
              className="appearance-none  relative block w-full  min-h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {/* We change the name themes later to fit our aesthetics ;) */}
           
            <div className="flex justify-center gap-3">
            <label>Select Theme</label>
              <span
                onClick={() => setTheme("default")}
                className={`rounded-2xl border-gray-300 bg-gray-400 p-2 cursor-pointer ${
                  theme === "default" ? "bg-gray-600 text-white" : ""
                }`}
              >
               
              </span>
              <span
                onClick={() => setTheme("green")}
                className={`rounded-2xl border-gray-300 bg-green-600  hover:bg-green-700 p-2 cursor-pointer ${
                  theme === "green" ? "bg-green-700 text-white" : ""
                }`}
              >
          
              </span>
              <span
                onClick={() => setTheme("dark")}
                className={`rounded-xl border-gray-300 bg-gray-700 p-2 cursor-pointer text-white ${
                  theme === "dark" ? "bg-gray-600 text-white" : ""
                }`}
              >
               
              </span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full min-h-12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
