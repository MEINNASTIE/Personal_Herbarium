import { useContext, useState } from 'react'
import { PlantContext } from '../../context/plantProvider'
function PlantItem({ plant }){

    const { deletePlantHandler,editePLant } = useContext(PlantContext);
    const [editMode, setEditMode] = useState(false);
    const [editedPlant, setEditedPlant] = useState({
        name: plant.name,
        type: plant.type,
        categorie: plant.categorie,
        latinName: plant.latinName,
        description: plant.description,
    });
    const handleEditChange = (e) => {
        setEditedPlant({ ...editedPlant, [e.target.name]: e.target.value });
    };
    const onSaveClick = async () => {
        await editePLant(plant._id, editedPlant);
        setEditMode(false); 
    };

    const onCancelClick = () => {
        setEditedPlant({
            name: plant.name,
            type: plant.type,
            categorie: plant.categorie,
            latinName: plant.latinName,
            description: plant.description,

        });
        setEditMode(false); 
    };
    const onDeleteClick = () => {
        deletePlantHandler(plant._id);
      };


      const onEditeClick = ()=>{
        setEditMode(true)
        editePLant(plant._id)
      }
    return(
        <div className="border p-4 rounded-md shadow-lg"> 
        {editMode ? (<>
                    <input type="text" name="name" value={editedPlant.name} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="type" value={editedPlant.type} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="categorie" value={editedPlant.categorie} onChange={handleEditChange} className="block mb-2" />
                    <input type="text" name="latinName" value={editedPlant.latinName} onChange={handleEditChange} className="block mb-2" />
                    <textarea name="description" value={editedPlant.description} onChange={handleEditChange} className="block mb-2" />
                    <button onClick={onSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                    <button onClick={onCancelClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </>):
        (<>{plant.image && (
            <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover rounded-md" />
            )}
                  <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
                  <p>Type: {plant.type}</p>
                  <p>Category: {plant.categorie}</p>
                  <p>Latin Name: {plant.latinName}</p>
                  <p>Description: {plant.description}</p>
                  <div>
                 <button onClick={onDeleteClick} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
                   Delete Plant
                 </button>
                 <button onClick={onEditeClick} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                 Edit Plant
                </button>
                 </div></>)}
            

        </div>
    )
}

export default PlantItem