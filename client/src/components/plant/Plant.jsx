import { useContext, useEffect, useState } from 'react'
import { PlantContext } from '../../context/plantProvider'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/api';
import axios from 'axios';
import { UserContext } from '../../context/userProvider';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faPencil } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../sticky/Navbar';
import Footer from '../sticky/Footer';

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
        <div className={`${className} flex flex-col h-screen lg:mx-[150px] justify-center`}>
            <div className="flex-grow">
                <Navbar />
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
                        <div className="bg-opacity-10 bg-white pb-10 mr-[150px] ml-[150px] mt-[100px] rounded-lg border border-1 shadow-md">
                        <div className="flex justify-center items-center pt-10 relative">
                                <div className="flex flex-col">
                                {loadedPlant.image && (
                                    <img src={loadedPlant.image} alt={loadedPlant.name} className="w-[650px] h-[450px] object-cover rounded-l-none rounded-tl-lg rounded-bl-lg" />
                                )}
                                <h3 className="text-[30px] font-bold absolute top-[85%] left-[4.5%] bg-opacity-50 bg-white p-2 pr-4 pl-4 rounded-lg">{loadedPlant.name}</h3>
                                </div>

                                <div className="bg-gray-400 w-[580px] h-[450px] pt-20  rounded-tr-lg rounded-br-lg pl-10">
                                <p><span className="font-bold text-[20px]">Type:</span> {loadedPlant.type}</p>
                                <p><span className="font-bold text-[20px]">Category:</span> {loadedPlant.categorie}</p>
                                <p><span className="font-bold text-[20px]">Latin Name:</span> {loadedPlant.latinName}</p>
                                <p><span className="font-bold text-[20px]">Description:</span> {loadedPlant.description}</p>
                                <div className="mt-40 text-right mr-3">
                                    <button onClick={onDeleteClick} className="mt-4  hover:text-gray-700 text-white font-bold py-2 px-4 rounded mr-4 text-[30px]"><FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon></button>
                                    <button onClick={onEditeClick} className="mt-4  hover:text-gray-700 text-white font-bold py-2 px-4 rounded text-[30px]"><FontAwesomeIcon icon={faPencil} /></button>
                                </div>
                            </div>
                        </div>
                        </div>
                        </>
                    )}
                </>
            )}
            </div>
            <Footer />
        </div>
    );
}

export default PlantItem;
