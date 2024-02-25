import axios from 'axios';

import { useParams } from 'react-router-dom';
import { baseUrl } from '../utils/api.js';
import Navbar from '../components/sticky/Navbar.jsx';
import Footer from '../components/sticky/Footer.jsx';
import { useContext, useEffect, useState } from 'react';
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
            <div className="flex-grow">
            <Navbar/>
        <div className="flex-grow">
            <h1 className="text-center text-2xl font-bold my-5 text-green-800">Plants Created by User</h1>
                <div className="flex flex-wrap justify-center gap-10 px-5">
                    {plants.map(plant => (
                    <div key={plant._id} className="border border-green-500 rounded-lg p-4 max-w-sm w-full bg-green-100 shadow-lg">
                    {plant.image && (
                        <img src={plant.image} alt={plant.name} className="w-full h-64 object-contain rounded-md mb-4" />
                    )}
                    <div className="pl-10">
                    <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
                    <p>Type: {plant.type}</p>
                    <p>Category: {plant.categorie}</p>
                    <p>Latin Name: {plant.latinName}</p>
                    <p>Description: {plant.description}</p>
                    </div>
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
