import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";

export const SingleVehicle = () => {
  const params = useParams();
  const [vehicles, setVehicles] = useState({}); // Agrega el estado 'vehicles'

  const fetchVehiclesData = async () => {
    // Intentar obtener el resultado desde el localStorage
    const cachedVehicles = JSON.parse(localStorage.getItem('vehiclesLocal'));
    console.log("CACHED: ", cachedVehicles)
    if (cachedVehicles && cachedVehicles[params.vehiclesId]) {
      setVehicles(cachedVehicles[params.vehiclesId]); //params.vehiclesId = 1 o a los numeros de cada vehiclesaje
    } else {
      // Si no está en el localStorage, realizar la llamada a la API
      const response = await fetch(`https://www.swapi.tech/api/vehicles/${params.vehiclesId}`);
      if (response.ok) {
        const data = await response.json();
        const VehiclesData = data.result.properties;
        setVehicles(VehiclesData);
        // Guardar el resultado en el localStorage para futuras ocasiones
        localStorage.setItem('vehiclesLocal', JSON.stringify({ ...cachedVehicles, [params.vehiclesId]: VehiclesData }));
      } else {
        console.error("Error fetching data:", response.status, response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchVehiclesData();
  }, [params.vehiclesId]);

  if (!vehicles.name) { // Cambia la condición aquí para verificar si hay datos en 'person.name'
    return <div>Loading...</div>;
  }

  return (
<div className="d-flex justify-content-center">
    <div className=" mb-3 black text-white bordes d-flex" style={{width: "55%"}} >
        <div className="">
            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${params.vehiclesId}.jpg`} className="bordesSmallimg" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={vehicles.name} />   
        </div>
      
        <div className="card-body text-center d-flex justify-content-center flex-column">
            <h3 className="card-text"><b>Name: </b><span className="text-info">{vehicles.name}</span></h3>
            <p className="card-text"><b>Model: </b><span className="text-info">{vehicles.model}</span></p>
            <p className="card-text"><b>Manufacturer: </b><span className="text-info">{vehicles.manufacturer}</span></p>
            <p className="card-text"><b>Class: </b><span className="text-info">{vehicles.vehicle_class}</span></p>
            <p className="card-text"><b>Cost: </b><span className="text-info">{vehicles.cost_in_credits} credits</span></p>
            <p className="card-text"><b>Speed: </b><span className="text-info">{vehicles.max_atmosphering_speed} kms/h</span></p>
            <p className="card-text"><b>Length: </b><span className="text-info">{vehicles.length} m</span></p>
            <p className="card-text"><b>Carry Capacity: </b><span className="text-info">{vehicles.cargo_capacity} kg</span></p>
            <p className="card-text mb-5"><b>Passengers: </b><span className="text-info">{vehicles.passengers}</span></p>
            <div clasName="mt-5">
                <img src={`http://img3.wikia.nocookie.net/__cb20070927031551/starwars/images/0/0a/Lucasfilm.jpg`} classNameName="img-fluid" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={vehicles.name} />   
            </div>
        </div>
    </div>
    
  
</div>
  );
};
