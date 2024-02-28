import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import HamburgerMenu from './HamburgerMenu';
import { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import LOGO from "../../assets/test.png"


export default function Navbar() {
  const { user,  isLoggedIn, logout } = useContext(UserContext);


  const { theme } = user;
  const className = `${theme}-theme`;

  return (
  <div > 
      <nav className={`${className} secondary limes flex items-center justify-between flex-wrap bg-gray-500 p-6 relative`}>
        <div className="flex items-center">
            {isLoggedIn ? (
              <>
              <Link to="/" className="flex items-center">
                <img src={user.photo} alt="User Photo" className="w-[30px] h-[30px] rounded-full object-cover"/>
                <span className="text-white ml-2">{user ? user.name : 'User'}</span>
              </Link>
                <button onClick={logout} className="text-white ml-4">Logout</button>
            </>        
              ) : (
            <>
             <Link to="/" className="flex items-center">
               <FontAwesomeIcon icon={faUser} className="text-white" />
               <span className="text-white ml-2">User Name</span>
             </Link>
             <Link to="/login" className="text-white ml-4">Login</Link>
          </>
        )}
        </div>
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow flex items-center space-x-4">
            <div>
              <img src={LOGO} alt="logo" className="w-[40px] cursor-pointer"></img> 
            </div>
            <div>
            <Link to="/profilePage" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Profile</Link>
            <Link to="/herbarium" className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white mr-4">Herbarium +</Link>
            </div>
          </div>
        </div>
      </nav>
      </div>
  );
}


