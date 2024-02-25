import { useContext } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';
import PlantOnDisplay from './PlantOnDisplay.jsx';

function PlantList(){
    const { plants } = useContext(PlantContext);

    return (
        <div className="max-h-[500px] md:max-h-[5620px] lg:max-h-[590px] overflow-y-auto mr-6 ml-6 md:mr-20 md:ml-20 lg:mr-40 lg:ml-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants?.map(plant => (
                    <PlantOnDisplay key={plant._id} plant={plant} />
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