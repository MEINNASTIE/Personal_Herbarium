import { useContext, useState } from 'react';
import { PlantContext } from '../../context/plantProvider.jsx';
import { UserContext } from '../../context/userProvider.jsx';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { categories, filterPlantsByCategory } = useContext(PlantContext); ///////

    const { user } = useContext(UserContext);
    const { theme } = user;
    const className = `${theme}-theme`;


    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

   
    return (
        <div className="relative z-30">
            <button className={`${className} limes-bottom quarto px-3 py-1 bg-gray-700 w-full text-white`} onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Search by categories'}
            </button>
            {isOpen && (
                <div className={`${className} limes-bottom tertiary absolute top-full left-0 w-full bg-gray-400 p-4 h-[200px] flex justify-center items-center flex-col`}> 
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







