import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context/userProvider';
import LOGO from "../../assets/test.png"
import { Link } from 'react-router-dom';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { theme } = user;
  const className = `${theme}-theme`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden z-80">
      <button onClick={toggleMenu} className={`${className} limes secondary flex items-center px-3 py-2 border rounded text-white border-white justify-center`}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      {isOpen && (
        <div className={`${className} limes-hamburger secondary absolute top-0 left-0 right-0 z-50 bg-gray-500 p-4`}>
          <button onClick={closeMenu} className="text-white absolute top-2 right-2">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="flex flex-col items-center">
          <Link to="/">
            <img src={LOGO} alt="logo" className="w-[40px] cursor-pointer block" />
          </Link>
          <a href="#" className="block mt-4 text-white">Profile</a>
          <a href="#" className="block mt-4 text-white">Herbarium +</a>
          </div>
        </div>
      )}
    </div>
  );
}


