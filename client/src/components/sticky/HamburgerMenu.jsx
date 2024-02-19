import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="block md:hidden z-50">
      <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-white border-white">
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-gray-500 p-4">
          <button onClick={closeMenu} className="text-white absolute top-2 right-2">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <a href="#" className="block mt-10 text-white">Logo</a>
          <a href="#" className="block mt-4 text-white">Profile</a>
          <a href="#" className="block mt-4 text-white">Herbarium +</a>
        </div>
      )}
    </div>
  );
}


