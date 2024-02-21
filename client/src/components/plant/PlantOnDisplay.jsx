import { Link } from "react-router-dom";

export default function PlantOnDisplay({plant}){
    return (
        <>
        <Link to={`/plant/${plant._id}`} key={plant._id}>
            <div className="border p-4 rounded-md shadow-md ">
                {plant.image && (
                <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover rounded-md" />
                )}
                <h3 className="text-lg font-bold mt-2">{plant.name}</h3>
                <p>Latin Name: {plant.latinName}</p>
                <p>Category: {plant.categorie}</p>
            </div>
        </Link>
        </>
    );
}

