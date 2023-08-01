import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";

export const SinglePeople = () => {
  const params = useParams();
  const [person, setPerson] = useState({}); // Agrega el estado 'person'

  const fetchPersonData = async () => {
    // Intentar obtener el resultado desde el localStorage
    const cachedPerson = JSON.parse(localStorage.getItem('peopleLocal'));
    console.log("CACHED: ", cachedPerson)
    if (cachedPerson && cachedPerson[params.peopleId]) {
      setPerson(cachedPerson[params.peopleId]); //params.peopleId = 1 o a los numeros de cada personaje
    } else {
      // Si no está en el localStorage, realizar la llamada a la API
      const response = await fetch(`https://www.swapi.tech/api/people/${params.peopleId}`);
      if (response.ok) {
        const data = await response.json();
        const personData = data.result.properties;
        setPerson(personData);
        // Guardar el resultado en el localStorage para futuras ocasiones
        localStorage.setItem('peopleLocal', JSON.stringify({ ...cachedPerson, [params.peopleId]: personData }));
      } else {
        console.error("Error fetching data:", response.status, response.statusText);
      }
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, [params.peopleId]);

  if (!person.name) { // Cambia la condición aquí para verificar si hay datos en 'person.name'
    return <div>Loading...</div>;
  }

  return (
<div className="d-flex justify-content-center">
  <div className=" mb-3 black text-white bordes" style={{width: "60%"}}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src={`https://starwars-visualguide.com/assets/img/characters/${params.peopleId}.jpg`} className="bordesimg" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={person.name} />   
      </div>
      <div className="col-md-8">
        <div className="card-body text-center mt-5">
          <h3 className="card-text"><b>Name: </b><span className="text-info">{person.name}</span></h3>
          <p className="card-text"><b>Height: </b><span className="text-info">{person.height} cm</span></p>
          <p className="card-text"><b>Mass: </b><span className="text-info">{person.mass} Kg</span></p>
          <p className="card-text"><b>Hair Color: </b><span className="text-info">{person.hair_color}</span></p>
          <p className="card-text"><b>Skin Color: </b><span className="text-info">{person.skin_color}</span></p>
          <p className="card-text"><b>Eye Color: </b><span className="text-info">{person.eye_color}</span></p>
          <p className="card-text"><b>Birth Year: </b><span className="text-info">{person.birth_year}</span></p>
          <p className="card-text mb-5"><b>Gender: </b><span className="text-info">{person.gender}</span></p>
          <div clasName="mt-5">
            <img src={`http://img3.wikia.nocookie.net/__cb20070927031551/starwars/images/0/0a/Lucasfilm.jpg`} classNameName="img-fluid" onError={(e) => {e.target.src = "./assets/img/placeholder.jpg";}} alt={person.name} />   
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
