import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import HamburgerMenu from './HamburgerMenu';
import { useContext } from 'react';
import { UserContext } from '../../context/userProvider';


export default function Navbar() {
  const { user,  isLoggedIn, logout } = useContext(UserContext);

  return (
    <div>
    <nav className="flex items-center justify-between flex-wrap bg-gray-500 p-6 z-50">
      <div className="flex items-center">
          {isLoggedIn ? (
             <>
            <FontAwesomeIcon icon={faUser} className="text-white" />
               <span className="text-white ml-2">{user ? user.name : 'User'}</span>
               <button onClick={logout} className="text-white ml-4">Logout</button>
           </>        
            ) : (
          <>
          <FontAwesomeIcon icon={faUser} className="text-white" />
          <span className="text-white ml-2">User Name</span>
          <Link to="/login" className="text-white ml-4">Login</Link>
         </>
       )}
      </div>
      <div className="lg:hidden">
        <HamburgerMenu />
      </div>
      <div className="hidden lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Logo</a>
          <a href="#" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Profile</a>
          <Link to="/herbarium" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Herbarium +</Link>
        </div>
      </div>
    </nav>
    </div>
  );
}


