import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";

export const SinglePlanet = () => {
  const params = useParams();
  const [planet, setPlanet] = useState({}); // Agrega el estado 'person'

const fetchPlanetData = async () => {
    // Intentar obtener el resultado desde el localStorage
    const cachedPlanet = JSON.parse(localStorage.getItem('planetsLocal'));
    console.log("CACHED: ", cachedPlanet)
    if (cachedPlanet && cachedPlanet[params.planetId]) {
      setPlanet(cachedPlanet[params.planetId]); //params.planetId = 1 o a los numeros de cada personaje
    } else {
      // Si no está en el localStorage, realizar la llamada a la API
      const response = await fetch(`https://www.swapi.tech/api/planets/${params.planetId}`);
      if (response.ok) {
        const data = await response.json();
        const planetData = data.result.properties;
        setPlanet(planetData);
        // Guardar el resultado en el localStorage para futuras ocasiones
        localStorage.setItem('planetsLocal', JSON.stringify({ ...cachedPlanet, [params.planetId]: planetData }));
      } else {
        console.error("Error fetching data:", response.status, response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchPlanetData();
  }, [params.planetId]);

  if (!planet.name) { // Cambia la condición aquí para verificar si hay datos en 'person.name'
    return <div>Loading...</div>;
  }

  return (
<div className="d-flex justify-content-center">
  <div className=" mb-3 black text-white bordes" style={{width: "43%"}}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src={`https://starwars-visualguide.com/assets/img/planets/${params.planetId}.jpg`} className="bordesSmallimg" onError={(e) => {
                      e.target.src = "https://1.bp.blogspot.com/-KoRhKcCHwBE/Tndslf5GHYI/AAAAAAAAZk4/8Ihcjjwr7Wg/s1600/freebies2deals-star-wars-6-set.jpg";
                    }} alt={planet.name} style={{width: "350px"}}/>   
      </div>
      <div className="col-md-8">
        <div className="card-body text-center ms-5 ps-5 mt-3">
          <h3 className="card-text"><b>Name: </b><span className="text-info">{planet.name}</span></h3>
          <p className="card-text"><b>Diameter: </b><span className="text-info">{planet.diameter} Km</span></p>
          <p className="card-text"><b>Rotation period: </b><span className="text-info">{planet.rotation_period} Hours</span></p>
          <p className="card-text"><b>Orbital period: </b><span className="text-info">{planet.orbital_period} Days</span></p>
          <p className="card-text"><b>Gravity: </b><span className="text-info">{planet.gravity} gal</span></p>
          <p className="card-text"><b>Population: </b><span className="text-info">{planet.population} hab/m²</span></p>
          <p className="card-text"><b>Climate: </b><span className="text-info">{planet.climate}</span></p>
          <p className="card-text"><b>Terrain: </b><span className="text-info">{planet.terrain}</span></p>
          <p className="card-text mb-5"><b>Created: </b><span className="text-info">{planet.created}</span></p>
          <div className="my-3">
            <img src={`http://img3.wikia.nocookie.net/__cb20070927031551/starwars/images/0/0a/Lucasfilm.jpg`} classNameName="img-fluid"  alt={planet.name} />   
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
