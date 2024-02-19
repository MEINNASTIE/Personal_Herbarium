import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-gray-500 text-white p-6 z-50">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">Additional Research</h2>
            <ul className="text-[12px]">
              <li>Will have links here</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">© 2024 Can add our project name</h2>
            <p className="text-[12px]">Made with <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> by our team name</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-m font-semibold mb-4">Download on App Store</h2>
            <div className="flex items-center justify-center">
              <img src="appstore-icon.png" alt="App Store" className="h-12 mr-4" />
              <img src="playstore-icon.png" alt="Play Store" className="h-12" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
