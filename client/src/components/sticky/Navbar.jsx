import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faUser} className="text-white" />
        <span className="text-white ml-2">User Name</span>
      </div>
      <div className="lg:hidden">
        <HamburgerMenu />
      </div>
      <div className="hidden lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Logo</a>
          <a href="#" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Profile</a>
          <a href="#" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Herbarium +</a>
        </div>
      </div>
    </nav>
  );
}



