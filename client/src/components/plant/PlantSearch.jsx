import { useContext, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/api';
import { UserContext } from '../../context/userProvider';

const PlantSearch = () => {
  const [query, setQuery] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const { theme } = user;
  const className = `${theme}-theme`;

  const handleSearch = async () => {
    try {
      setLoading(true);
      let url = `${baseUrl}/plant/find/search`;
      
      if (query.trim()) {
        url += `?query=${query}`;
      }

      const response = await axios.get(url);
      const plantsData = response.data.plants || [];
      setPlants(plantsData);
    } catch (error) {
      console.error('Error searching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${className} limes-search bg-gray-500 pt-2 pb-2 rounded-l-none rounded-t-none rounded-tr-lg rounded-br-lg secondary relative z-40`}>
      <p className="pb-2">Explore fellow plants</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Plants..."
        className={`${className} quinque limes-bottom-top p-2 focus:outline-none outline-none`}
      />
      <button onClick={handleSearch} className="pt-2">Search</button>
      
      <div>
        {loading && <p>Loading...</p>}
        {plants.length > 0 && (
          <ul className="flex flex-col text-left">
            {plants.map((plant) => (
              <li key={plant._id} className="ml-4">
                <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
                <p>Latin Name: {plant.latinName}</p>
                <p>Created by: {plant.userId.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default PlantSearch;



