import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/api.js"
import { useNavigate } from "react-router-dom";


export const PlantContext = createContext(null);
export const usePlantContext = () => useContext(PlantContext);


const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const navigate = useNavigate();


    const getPlants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/plant/`)
        setPlants(response.data.plants);
      } catch (error) {
        console.error("Error fetching planst:", error);
      }
    };

    useEffect(() => {
      getPlants();
      }, []);

      const createPlantHandler = async (e) => {
        e.preventDefault(); 
        const body = new FormData();
        body.append("name", e.target.name.value);
        body.append("type", e.target.type.value);
        body.append("categorie", e.target.categorie.value);
        body.append("latinName", e.target.latinName.value);
        body.append("description", e.target.description.value);
        body.append("plant-image", e.target["plant-image"].files[0]);
      
        try {
          const { data: newPlant } = await axios.post(`${baseUrl}/plant/create`, body);
      
          setPlants(prevPlants => [...prevPlants, newPlant.newPlant]) ;       
          e.target.reset();
          navigate("/");
          console.log(newPlant)
        } catch (error) {
          console.error("Error creating plant:", error);
        }
      };

      const deletePlantHandler = async (id) => {
        try {
          const response = await axios.delete(`${baseUrl}/plant/delete/${id}`);
          alert(response.data.message);
          setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
        } catch (err) {
          console.error("Error deleting plant:", err);
        }
      };

      const editePLant = async(id, updatedPlant)=>{
        try{
          const response = await axios.put(`${baseUrl}/plant/edite/${id}`, updatedPlant,{
            headers: {
              'Content-Type': 'application/json',
            },
          })
          setPlants(currentPlants =>
            currentPlants.map(plant => 
              plant._id === id ? { ...plant, ...response.data } : plant
            )
          );
          getPlants()

      }catch (error) {
        console.error("Error editing plant:", error.response ? error.response.data : error);
      }
      }

      const searchPlants = async (query) => {
        try {
          let url = `${baseUrl}/plant/search`;
          if (query.trim()) {
            url += `?query=${query}`;
          }
          const response = await axios.get(url);
          setPlants(response.data.plants);
        } catch (error) {
          console.error("Error searching plants:", error);
        }
      };

      const getCategories = async () => {
        const response = await axios.get(`${baseUrl}/plant/categories`);
        return response.data.categories; 
    };//////

    const filterPlantsByCategory = async (category) => {
      const response = await axios.get(`${baseUrl}/plant/filter?categorie=${category}`);
      setPlants(response.data.plants);
  }; //////



      return (
        <PlantContext.Provider value={{createPlantHandler,deletePlantHandler,editePLant,plants, searchPlants, getCategories, filterPlantsByCategory}}>
          {children}
        </PlantContext.Provider>
      );


}

export default PlantProvider;