import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/api.js"
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userProvider.jsx";


export const PlantContext = createContext(null);
export const usePlantContext = () => useContext(PlantContext);


const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState();

    useEffect(() => {
      if (user) {
          setLoading(false);
      }
    }, [user]);


    useEffect(() => {
          getPlants();
          getCategories();
          }, []);
          

    const getPlants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/plant/`, {
          headers: {Authorization: localStorage.getItem("jwt_token")}
        })
        setPlants(response.data.plants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

      const createPlantHandler = async (e) => {
        e.preventDefault(); 

        console.log("createPlantHandler: ", user)
        if (!user) {
          console.error("User is not loaded yet");
          return;
        }
        const body = new FormData();
        body.append("name", e.target.name.value);
        body.append("type", e.target.type.value);
        body.append("categorie", e.target.categorie.value);
        body.append("latinName", e.target.latinName.value);
        body.append("description", e.target.description.value);
        body.append("plant-image", e.target["plant-image"].files[0]);
        body.append("userId", user.id); 
        body.append("userName", user.name)
      
        try {
          const { data: newPlant } = await axios.post(`${baseUrl}/plant/create`, body, {
            headers: {Authorization: localStorage.getItem("jwt_token")}
          });
      
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

      if (loading) {
        return <div>Loading...</div>; 
      }

      async function getCategories() {
        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                console.log("No JWT token found");
                return;
            }
                const response = await axios.get(`${baseUrl}/plant/find/categories`, {
                headers: {
                    Authorization: token
                }
            });
                setCategories(response.data.categories);
    
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const filterPlantsByCategory = async (category) => {
      const response = await axios.get(`${baseUrl}/plant/filter?categorie=${category}`);
      setPlants(response.data.plants);
    };

      return (
        <PlantContext.Provider value={{createPlantHandler,deletePlantHandler,editePLant, plants, filterPlantsByCategory, categories}}>
          {children}
        </PlantContext.Provider>
      );
}

export default PlantProvider;