import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";

export const SingleSpecie = () => {
  const params = useParams();
  const [species, setSpecies] = useState({}); // Agrega el estado 'species'

  const fetchSpeciesData = async () => {
    // Intentar obtener el resultado desde el localStorage
    const cachedSpecies = JSON.parse(localStorage.getItem('speciesLocal'));
    console.log("CACHED: ", cachedSpecies)
    if (cachedSpecies && cachedSpecies[params.speciesId]) {
      setSpecies(cachedSpecies[params.speciesId]); //params.speciesId = 1 o a los numeros de cada Speciesaje
    } else {
      // Si no está en el localStorage, realizar la llamada a la API
      const response = await fetch(`https://www.swapi.tech/api/species/${params.speciesId}`);
      if (response.ok) {
        const data = await response.json();
        const SpeciesData = data.result.properties;
        setSpecies(SpeciesData);
        // Guardar el resultado en el localStorage para futuras ocasiones
        localStorage.setItem('speciesLocal', JSON.stringify({ ...cachedSpecies, [params.speciesId]: SpeciesData }));
      } else {
        console.error("Error fetching data:", response.status, response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchSpeciesData();
  }, [params.speciesId]);

  if (!species.name) { // Cambia la condición aquí para verificar si hay datos en 'person.name'
    return <div>Loading...</div>;
  }

  return (
<div className="d-flex justify-content-center">
  <div className=" mb-3 black text-white bordes" style={{width: "60%"}}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src={`https://starwars-visualguide.com/assets/img/species/${params.speciesId}.jpg`} className="bordesimg" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={species.name} />   
      </div>
      <div className="col-md-8">
        <div className="card-body text-center mt-5">
          <h3 className="card-text"><b>Name: </b><span className="text-info">{species.name}</span></h3>
          <p className="card-text"><b>Classification: </b><span className="text-info">{species.classification}</span></p>
          <p className="card-text"><b>Designation: </b><span className="text-info">{species.designation}</span></p>
          <p className="card-text"><b>Average height: </b><span className="text-info">{species.average_height} cm</span></p>
          <p className="card-text"><b>Average lifespan: </b><span className="text-info">{species.average_lifespan} years</span></p>
          <p className="card-text"><b>Language: </b><span className="text-info">{species.language}</span></p>
          <p className="card-text"><b>Eyes colors: </b><span className="text-info">{species.eye_colors}</span></p>
          <p className="card-text mb-5"><b>Skin colors: </b><span className="text-info">{species.skin_colors}</span></p>
          <div clasName="mt-5">
            <img src={`http://img3.wikia.nocookie.net/__cb20070927031551/starwars/images/0/0a/Lucasfilm.jpg`} classNameName="img-fluid" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={species.name} />   
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
