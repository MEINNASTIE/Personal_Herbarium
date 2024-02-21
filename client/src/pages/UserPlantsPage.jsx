import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/api.js';

const UserPlantsPage = () => {
    const { userId } = useParams();
    const [plants, setPlants] = useState([]);

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
        <div>
            <h1>Plants Created by User</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {plants.map(plant => (
                    <div key={plant._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '200px' }}>
                        <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h3>{plant.name}</h3>
                        <p>Type: {plant.type}</p>
                        <p>Category: {plant.categorie}</p>
                       
                    </div>
                ))}
            </div>
        </div>
    );
    
}
export default UserPlantsPage;
