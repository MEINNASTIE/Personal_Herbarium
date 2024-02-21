import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userProvider";

export default function Footer() {
  const { user } = useContext(UserContext);
  const { theme } = user;
  const className = `${theme}-theme`;

  return (
    <footer className={`${className} secondary bg-gray-500 text-white p-6 z-50 text-center `}>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">Additional Research</h2>
            <ul className="text-[12px]">
              <li className="hover:text-gray-600"><Link to="https://www.tdwg.org/standards/hispid3/" target="_blank"rel="noopener noreferrer">Guidelines Herbarium Information Standards</Link></li>
              <li><Link to="https://collections.nmnh.si.edu/search/botany/#new-search" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Smithsonian NMNH Research & Collections</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">© 2024 Herbarium</h2>
            <p className="text-[12px]">Made with <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> by our team name</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">Download on App Store</h2>
            <div className="flex items-center justify-center">
              <img src="/app-store.png" alt="App Store" className="h-10 mr-4" />
              <img src="/google-play.png" alt="Play Store" className="h-12" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
