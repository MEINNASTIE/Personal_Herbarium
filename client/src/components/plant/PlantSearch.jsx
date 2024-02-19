import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/api';

const PlantSearch = () => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);

  const handleSearch = async () => {
    try {
      let url = `${baseUrl}/plant/search`;
      
      if (query.trim()) {
        url += `?query=${query}`;
      }

      const response = await axios.get(url);
      const data = response.data.plants; 

      console.log(data);
      
      setPlants(data);
    } catch (error) {
      console.error('Error searching plants:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Plants..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
      <ul className="flex ">
        {plants.map((plant) => (
            <li key={plant._id}>
            <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
            <p>Type: {plant.type}</p>
            <p>Category: {plant.categorie}</p>
            <p>Latin Name: {plant.latinName}</p>
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantSearch;

