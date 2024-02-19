import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="relative">
            <button className="px-3 py-1 bg-gray-700 w-full text-white" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            <div className={`absolute top-full left-0 w-full bg-gray-400 transition-all duration-300 overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}>
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Categories</h1>
                </div>
            </div>
        </div>
    );
}







