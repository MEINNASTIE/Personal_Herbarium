import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "..//utils/api.js";
import { Link } from "react-router-dom";
import Navbar from "../components/sticky/Navbar.jsx";
import Footer from "../components/sticky/Footer.jsx";
import { UserContext } from "../context/userProvider.jsx";
import cardBackgroundPhot from "../assets/background2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram,faTwitter} from "@fortawesome/free-brands-svg-icons";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const { user } = useContext(UserContext);
  const { theme } = user;
  const className = `${theme}-theme`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/all-users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className={`${className} lg:mx-[150px] flex flex-col min-h-screen`}>
      <Navbar />
      <div className={`${className} limes-main flex-grow`}>
        <div className="d-flex justify-center align-middle">
          <div className="d-flex grid  grid-cols-5 gap-4 m-10">
            {users.map((user) => (
              <Link to={`/plants/user/${user._id}`} key={user._id}>
                <div className="bg-white my-6 pb-4 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-xl mx-auto">
                  <div className="relative h-40">
                    <img
                      className="absolute h-full w-full object-cover"
                      src={cardBackgroundPhot}
                    />
                  </div>
                  <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img
                      className="object-cover w-full h-full"
                      src={user.photo}
                    />
                  </div>
                  <div className="mt-16">
                    <h1 className="text-lg text-center font-semibold">
                      {user.name}
                    </h1>
                    <p className="text-sm text-gray-900 text-center">
                     
                    </p>
                  </div>
                  <div className="mt-6 pt-3 flex item-center justify-center flex-wrap mx-6 border-t">
                  <div className="flex items-center justify-center mt-2">
            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-blue-500 mx-1" />
            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-pink-500 mx-1" />
            <FontAwesomeIcon icon={faTwitter} size="2x" className="text-blue-400 mx-1" />
          

          </div>
                    {/* <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-green-600 border-green-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                      User experience
                    </div>
                    
                    
                    
                    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                      Painting
                    </div> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UsersPage;
