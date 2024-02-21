import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userProvider";

export default function PlantOnDisplay({plant}){
    const { user } = useContext(UserContext);
    const { theme } = user;
    const className = `${theme}-theme`;

    return (
        <>
        <Link to={`/plant/${plant._id}`} key={plant._id}>
            <div className={`${className} secondary-text border p-4 rounded-md shadow-md relative text-left`}>
                {plant.image && (
                <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover rounded-md" />
                )}
                <div className="absolute top-[55%] left-[7%] bg-white bg-opacity-50 rounded-lg p-2">
                <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
                <p>Latin Name: {plant.latinName}</p>
                <p>Category: {plant.categorie}</p>
                </div>
            </div>
        </Link>
        </>
    );
}

