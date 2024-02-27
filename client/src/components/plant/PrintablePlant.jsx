import React from 'react';

// eslint-disable-next-line react/display-name
const PrintablePlant = React.forwardRef(({ plant }, ref) => {
    return (
        <div ref={ref} className="printable-content">
        <img src={plant.image} alt={plant.name} className="w-full"></img>
        <h1 className="text-4xl mt-4">{plant.name}</h1>
        <p><span>Type: </span>{plant.type}</p>
        <p><span>Category: </span>{plant.categorie}</p>
        <p><span>Latin Name: </span>{plant.latinName}</p>
        <hr></hr>
        <p className="text-lg mt-none"><span>Description: </span>{plant.description}</p>  
        <p><span>Taken by: </span>{plant.userId.name}</p>
      </div>
    );
  });
  
export default PrintablePlant;
