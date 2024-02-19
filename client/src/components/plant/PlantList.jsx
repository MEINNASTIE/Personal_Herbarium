import { useContext } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';
import PlantItem from './Plant.jsx';

function PlantList(){
    const { plants } = useContext(PlantContext)
    // if (!Array.isArray(plants)) {
    //     return <div>Loading plants...</div>;
    // }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants?.map(plant => (
            <PlantItem key={plant._id} plant={plant} />
          ))}
        </div>
      );
}


    export default PlantList