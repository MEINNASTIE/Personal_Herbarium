import { useContext } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';

export default function AddPlant() {
    const {createPlantHandler} = useContext(PlantContext)
    return(
        <div>
            <form onSubmit={createPlantHandler}>
            <input
        type="text"
        name="name"
        placeholder="Plant name"
        required
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
    <input
        type="text"
        name="type"
        placeholder="Plant type"
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
    <input
        type="text"
        name="categorie"
        placeholder="Category"
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
    <input
        type="text"
        name="latinName"
        placeholder="Latin name"
        required
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
    <input
        type="text"
        name="description"
        placeholder="Description"
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
     <input
        type="file"
        name="plant-image"
        className="w-full p-2 mb-3 border border-gray-400 rounded"
    />
    <button type='submit' className="bg-blue-500 text-white p-2 rounded">Add Plant</button>
            </form>
        </div>
    )

}