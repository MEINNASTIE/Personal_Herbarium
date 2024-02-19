import { useContext } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';
import PlantItem from './Plant.jsx';

function PlantList(){
    const { plants } = useContext(PlantContext);

    return (
        <div className="max-h-[350px] md:max-h-[200px] lg:max-h-[700px] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants?.map(plant => (
                    <PlantItem key={plant._id} plant={plant} />
                ))}
            </div>
        </div>
    );
}

export default PlantList;


// Redundant code for a loading use 
// if (!Array.isArray(plants)) {
//     return <div>Loading plants...</div>;
// }