import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/api';

const PlantSearch = () => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);

  const handleSearch = async () => {
    try {
      let url = `${baseUrl}/plant/find/search`;
      
      if (query.trim()) {
        url += `?query=${query}`;
      }

      const response = await axios.get(url);
      const plantsData = response.data.plants; 
      
      setPlants(plantsData);
    } catch (error) {
      console.error('Error searching plants:', error);
    }
  };

  return (
    <div className="bg-gray-500">
      <p>Explore fellow plants</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Plants..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <ul className="flex flex-col text-left">
          {plants.map((plant) => (
            <li key={plant._id}>
              <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
              <p>Latin Name: {plant.latinName}</p>
              <p>Created by: {plant.userId ? plant.userId.name : 'Unknown'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantSearch;



