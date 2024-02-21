import { useContext, useEffect, useState } from 'react'
import { PlantContext } from '../../context/plantProvider'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/api';
import axios from 'axios';
import { UserContext } from '../../context/userProvider';

function PlantItem({ plant }) {
    const { plantId } = useParams();

    console.log('Plant ID:', plantId);
    const [loadedPlant, setLoadedPlant] = useState();

    const { deletePlantHandler, editePLant } = useContext(PlantContext);
    const [editMode, setEditMode] = useState(false);
    const [editedPlant, setEditedPlant] = useState({
        name: "",
        type: "",
        categorie: "",
        latinName: "",
        description: "",
    });

    const { user } = useContext(UserContext);
    const { theme } = user;
    const className = `${theme}-theme`;

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                if (plant) {
                    setLoadedPlant(plant);
                } else {
                    const response = await axios.get(`${baseUrl}/plant/plant/${plantId}`);
                    console.log("Plant data from backend:", response.data);
                    setLoadedPlant(response.data.plant);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPlant();
    }, [plantId, plant]);

    useEffect(() => {
        if (plant) {
            setEditedPlant({
                name: plant.name,
                type: plant.type,
                categorie: plant.categorie,
                latinName: plant.latinName,
                description: plant.description,
            });
        }
    }, [plant]);

    const handleEditChange = (e) => {
        setEditedPlant({ ...editedPlant, [e.target.name]: e.target.value });
    };

    const onSaveClick = async () => {
        await editePLant(plantId, editedPlant);
        setEditMode(false);
    };

    const onCancelClick = () => {
        setEditMode(false);
    };

    const onDeleteClick = () => {
        deletePlantHandler(plantId);
    };

    const onEditeClick = () => {
        setEditMode(true);
    };

    return (
        <div className={`${className} border p-4 rounded-md shadow-lg w-1/2`}>
            {editMode ? (
                <>
                    <input type="text" name="name" value={editedPlant.name} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="type" value={editedPlant.type} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="categorie" value={editedPlant.categorie} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="latinName" value={editedPlant.latinName} onChange={handleEditChange} className="block mb-2" />
                    <textarea name="description" value={editedPlant.description} onChange={handleEditChange} className="block mb-2" />
                    <button onClick={onSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                    <button onClick={onCancelClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </>
            ) : (
                <>
                    {loadedPlant && (
                        <>
                            {loadedPlant.image && (
                                <img src={loadedPlant.image} alt={loadedPlant.name} className="w-full h-64 object-cover rounded-md" />
                            )}
                            <h3 className="text-lg font-bold mt-2">{loadedPlant.name}</h3>
                            <p>Type: {loadedPlant.type}</p>
                            <p>Category: {loadedPlant.categorie}</p>
                            <p>Latin Name: {loadedPlant.latinName}</p>
                            <p>Description: {loadedPlant.description}</p>
                            <div>
                                <button onClick={onDeleteClick} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Delete Plant</button>
                                <button onClick={onEditeClick} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Edit Plant</button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default PlantItem;
