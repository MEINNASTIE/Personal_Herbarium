import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import PlantList from "../components/plant/PlantList.jsx";
import Sidebar from "../components/sticky/Sidebar";
import { UserContext } from "../context/userProvider.jsx";
import "../styles/Global.css";
import "../index.css"
import PlantSearch from "../components/plant/PlantSearch.jsx";
import Modal from "../components/plant/SearchButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSearch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/sticky/Navbar.jsx";
import Footer from "../components/sticky/Footer.jsx";

export default function Homepage() {
  // For import on other pages use this code below
  const { user } = useContext(UserContext);
  const { theme } = user || {};
  const className = theme ? `${theme}-theme` : '';
  // 

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const containerRef = useRef(null); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return; 

    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, [page]);

  // background image solver - temporary fix 
  // solves also any other tricky element

  let backgroundImageUrl = '';
  let imgUrl = '';

  if (theme === 'green') {
    backgroundImageUrl = '/alien_bigger.png';
    imgUrl = '/alien_search.png';
  }

  let searchIcon;
  let paragraph;

  if (theme === 'blossom') {
  searchIcon = <FontAwesomeIcon icon={faSearch} />;
  paragraph = <p>And I can buy myself flowers</p>

  } else {
  searchIcon = <img src={imgUrl} alt="Search Icon" />;
  }

  const alienImg = theme ? <img src={backgroundImageUrl} className="absolute right-40 top-80 transform rotate-6"></img> : null;
  // 

  return (
    <div className={`${className} text-center lg:mx-[150px] relative`}>
      {alienImg}
      <Navbar className="sticky top-0 z-50"/>
      <div className={`${className} limes-main flex-grow pb-10`}>
        <div>
          <Sidebar /> 
          <div className="flex justify-between">
          <div className="relative">
            <button onClick={toggleModal} className="text-[29px] py-2 px-4 flex gap-10 items-center">
               {searchIcon}
               {paragraph}
            </button>
            {isModalOpen && (
              <div className="absolute">
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                  <PlantSearch />
                </Modal>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/AddPlant')}
            className="mb-4 text-white hover:text-gray-300 text-white font-bold py-2 px-4 text-[30px]"
          >
           <FontAwesomeIcon icon={faLeaf} />
          </button>
        </div>
        </div>
       
        <div className="mx-auto" ref={containerRef}>
          <PlantList />
        </div>
      </div>
      <Footer className="py-4 lg:py-6 fixed bottom-0 w-full bg-white z-50"/>
    </div>
  );
}

