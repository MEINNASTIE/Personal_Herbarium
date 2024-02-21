import { useContext, useState } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { categories, filterPlantsByCategory } = useContext(PlantContext); ///////


    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

   
    return (
        <div className="relative">
            <button className="px-3 py-1 bg-gray-700 w-full text-white" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-400 p-4"> 
                    <h1 className="text-lg font-semibold">Categories</h1>
                    <ul>
                        {categories.map(categorie => (
                            <li key={categorie} onClick={() => filterPlantsByCategory(categorie)} className="cursor-pointer">
                                {categorie}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}







