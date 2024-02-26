import { useContext } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';
import { UserContext } from '../../context/userProvider.jsx';
import Navbar from '../sticky/Navbar.jsx';
import Footer from '../sticky/Footer.jsx';

export default function AddPlant() {
    const { createPlantHandler } = useContext(PlantContext);
    const { user } = useContext(UserContext);
    const { theme } = user || {};
    const className = theme ? `${theme}-theme` : '';

    return (
    <div className={`${className} flex flex-col h-screen justify-center text-center lg:mx-[150px]`}>
       <Navbar />
        <div className={`${className} limes-main flex-grow flex justify-center items-center h-screen`}>
        <div className={`${className}`}>
                <form onSubmit={createPlantHandler} className={`${className} w-full max-w-lg p-8 shadow-lg rounded-lg bg-white border border-gray-200`}>
                <input
                    type="text"
                   name="name"
                    placeholder="Plant name"
                    required
                   className="w-full p-2 mb-4 border-2 border-green-500 rounded"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Plant type"
                   className="w-full p-2 mb-4 border-2 border-green-500 rounded"
                />
                <input
                    type="text"
                   name="categorie"
                    placeholder="Category"
                    className="w-full p-2 mb-4 border-2 border-green-500 rounded"
                />
               <input
                    type="text"
                   name="latinName"
                   placeholder="Latin name"
                   required
                   className="w-full p-2 mb-4 border-2 border-green-500 rounded"
               />
                <input
                    type="text"
                   name="description"
                   placeholder="Description"
                    className="w-full p-2 mb-4 border-2 border-green-500 rounded"
                />
                <input
                    type="file"
                    name="plant-image"
                   className="w-full p-2 mb-4 border-2 border-green-500 rounded file:border-none file:bg-green-200 file:text-green-700"
               />
                <button type='submit' className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors duration-200">Add Plant</button> 
                </form>
            </div>
            </div>  
        <Footer />
    </div>
   );
}