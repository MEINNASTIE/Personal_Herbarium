import  { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/api.js';
import Navbar from '../components/sticky/Navbar.jsx';
import Footer from '../components/sticky/Footer.jsx';
import { UserContext } from '../context/userProvider.jsx';

const UserPlantsPage = () => {
    const { userId } = useParams();
    const [plants, setPlants] = useState([]);

    const { user } = useContext(UserContext);
    const { theme } = user || {};
    const className = theme ? `${theme}-theme` : '';

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.get(`${baseUrl}/plant/user/${userId}`);
                setPlants(response.data.plants);
            } catch (error) {
                console.error('Error fetching plants:', error);
            }
        };

        fetchPlants();
    }, [userId]);
    return (
        <> 
        <div className={`${className} lg:mx-[150px] flex flex-col min-h-screen`}>
            <Navbar/>
            <div className={`${className} limes-main flex-grow`}>
            <h1 className="text-center mt-10 mb-5">Plants Created by User</h1>
            <div className={`flex justify-center items-center`}>
      
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {plants.map(plant => (
                        <div key={plant._id} className={`${className} limes border-1 border rounded-lg shadow-md p-[20px] w-[200px]`}>
                            <img src={plant.image} alt={plant.name} className="w-full h-[200px] object-cover rounded-lg mb-5" />
                            <h3>{plant.name}</h3>
                            <p>Type: {plant.type}</p>
                            <p>Category: {plant.categorie}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <Footer />
        </div>
        </>
    );
}
export default UserPlantsPage;
