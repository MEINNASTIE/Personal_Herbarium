import DummyCardGrid from "../components/dummy/DummGrid";
import Footer from "../components/sticky/Footer";
import Navbar from "../components/sticky/Navbar";
import { useNavigate } from 'react-router-dom';
import PlantList from "../components/plant/PlantList.jsx"
import Sidebar from "../components/sticky/Sidebar";
export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-center text-center mx-auto lg:mx-[300px]">
      <div className="bg-gray-300 flex flex-col justify-between flex-grow">
        <div>
          <Navbar />  
          <Sidebar />
        </div>
        <div className="mx-auto">
          <h1 className="text-3xl text-gray-500">Welcome to our small Herbarium</h1>
          <p>Start creating your own collection</p>
          <button
            onClick={() => navigate('/AddPlant')} 
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Plant
          </button>
          <PlantList/>
        <Footer />
      </div>
    </div>
  );
}

