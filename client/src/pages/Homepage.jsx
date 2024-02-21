import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import PlantList from "../components/plant/PlantList.jsx";
import Sidebar from "../components/sticky/Sidebar";
import { UserContext } from "../context/userProvider.jsx";
import "../styles/Global.css";
import PlantSearch from "../components/plant/PlantSearch.jsx";
import Modal from "../components/plant/SearchButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const { user } = useContext(UserContext);
  const { theme } = user;
  const className = `${theme}-theme`;

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

  return (
    <div className={`${className} flex flex-col h-screen justify-center text-center mx-auto lg:mx-[300px]`}>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <Sidebar /> 
          <div className="flex justify-between">
          <div className="relative">
            <button onClick={toggleModal} className="text-[29px] py-2 px-4">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
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
       
        <div className="mx-auto " ref={containerRef}>
          <PlantList />
        </div>
      </div>
    </div>
  );
}

