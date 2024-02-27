import React from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableComponent from './PrintablePlant.jsx';

import { useContext, useEffect, useState } from 'react'
import { PlantContext } from '../../context/plantProvider'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/api';
import axios from 'axios';
import { UserContext } from '../../context/userProvider';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faPencil, faPrint } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../sticky/Navbar';
import Footer from '../sticky/Footer';

function PlantItem({ plant }) {
    const { plantId } = useParams();

    const componentRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    

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
        <div className={`${className} lg:mx-[150px] justify-center`}>
            <Navbar className="sticky top-0 z-50"/>
            <div className={`${className} limes-main flex-grow h-[790px] pt-[20px]`}>
            {editMode ? (
                <>
                <div className={`${className} limes flex flex-col items-center  gap-6 border border-1 mr-40 ml-40 rounded-lg shadow-md bg-transparent pt-4 pb-4`}>
                <p className="text-white">Got a typo? Or simply wish to add something?</p>
                        <input 
                            type="text" 
                            name="name" 
                            value={editedPlant.name} 
                            onChange={handleEditChange} 
                            className={`${className} limes input border-white focus:border-gray-700 rounded-lg p-2 focus:outline-none placeholder:text-white`} 
                            placeholder="Name" 
                        />
                        <input 
                            type="text" 
                            name="type" 
                            value={editedPlant.type} 
                            onChange={handleEditChange} 
                            className={`${className} limes input border-white focus:border-gray-700 rounded-lg p-2 focus:outline-none placeholder:text-white`} 
                            placeholder="Type" 
                        />
                        <input 
                            type="text" 
                            name="categorie" 
                            value={editedPlant.categorie} 
                            onChange={handleEditChange} 
                            className={`${className} limes input border-white focus:border-gray-700 rounded-lg p-2 focus:outline-none placeholder:text-white`} 
                            placeholder="Category" 
                        />
                        <input 
                            type="text" 
                            name="latinName" 
                            value={editedPlant.latinName} 
                            onChange={handleEditChange} 
                            className={`${className} limes input border-white focus:border-gray-700 rounded-lg p-2 focus:outline-none placeholder:text-white`} 
                            placeholder="Latin Name" 
                        />
                        <textarea 
                            name="description" 
                            value={editedPlant.description} 
                            onChange={handleEditChange} 
                            className={`${className} limes input border-white focus:border-gray-700 rounded-lg p-2 focus:outline-none placeholder:text-white`} 
                            placeholder="Description" 
                        />
                        <div className="flex gap-4">
                            <button 
                                onClick={onSaveClick} 
                                className={`${className} limes ater hover:bg-opacity-30 hover:bg-white text-white button border-white p-2 rounded-lg `} 
                            >
                                Save
                            </button>
                            <button 
                                onClick={onCancelClick} 
                                className={`${className} limes ater hover:bg-opacity-30 hover:bg-white text-white button border-white p-2 rounded-lg`} 
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {loadedPlant && (
                        <>  
                        <div key={loadedPlant._id} className={`${className} limes pb-10 mr-[150px] ml-[150px] mt-[100px] rounded-lg border border-1 shadow-md bg-transparent`}>
                        <div className="flex justify-center items-center pt-10 relative">
                                <div className="flex flex-col">
                                {loadedPlant.image && (
                                    <img src={loadedPlant.image} alt={loadedPlant.name} className={`${className} limes-some-right w-[650px] h-[450px] object-cover rounded-l-none rounded-tl-lg rounded-bl-lg`} />
                                )}
                                <h3 className={`${className} limes secondary-text text-[30px] font-bold absolute top-[84%] left-[4.5%] bg-opacity-50 bg-white p-2 pr-4 pl-4 rounded-lg`}>{loadedPlant.name}</h3>
                                </div>

                                <div className={`${className} quinque quarto limes secondary-text bg-gray-400 w-[580px] h-[450px] pt-20  rounded-tr-lg rounded-br-lg pl-10`}>
                                <p><span className="font-bold text-[20px]">Type:</span> {loadedPlant.type}</p>
                                <p><span className="font-bold text-[20px]">Category:</span> {loadedPlant.categorie}</p>
                                <p><span className="font-bold text-[20px]">Latin Name:</span> {loadedPlant.latinName}</p>
                                <p><span className="font-bold text-[20px]">Description:</span> {loadedPlant.description}</p>
                                <div className="float-right mr-2">
                                    <button onClick={onDeleteClick} className={`${className} quinque mt-4  hover:text-[#BCC490] secondary-text font-bold py-2 px-4 rounded mr-4 text-[30px]`}>
                                        <FontAwesomeIcon icon={faCircleMinus}></FontAwesomeIcon>
                                    </button>
                                    <button onClick={onEditeClick} className={`${className} quinque mt-4  hover:text-[#BCC490] secondary-text font-bold py-2 px-4 rounded mr-4 text-[30px]`}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>

                                    <button onClick={handlePrint} className={`${className} quinque mt-4  hover:text-[#BCC490] secondary-text font-bold py-2 px-4 rounded mr-4 text-[30px]`}>
                                         <FontAwesomeIcon icon={faPrint} />
                                    </button>
                                    <div className="no-print hidden">
                                        <PrintableComponent ref={componentRef} plant={loadedPlant}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </>
                    )}
                </>
            )}
            </div>
            <Footer className="py-4 lg:py-6 fixed bottom-0 w-full bg-white z-50" />
        </div>
    );
}

export default PlantItem;
