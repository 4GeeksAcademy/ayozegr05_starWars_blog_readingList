import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { store, actions } = useContext(Context);
  
  

  const handleSearch = async (event) => {
    event.preventDefault();// Evita el reinicio del formulario al presionar Enter
    setSearchTerm(""); 
    // // Asegurarse de que searchTerm tenga un valor válido (cadena vacía si es undefined o null)
    // const term = searchTerm || "";
  
    // // Primero, asegurémonos de tener la lista completa de personas
    // await actions.getPeople();
  
    // // Luego, realicemos la búsqueda y obtenemos el resultado filtrado
    // const filteredPeople = actions.searchBar(term);
  
    // // Actualiza el estado 'people' con los resultados filtrados
    // actions.setPeople(filteredPeople); --------> definir
  };

  const fetchData = (value) => {
    fetch("https://www.swapi.tech/api/people")
      .then((response) => response.json())
      .then((json) => {
        const result = json.results.filter((person) => {
            return (
              value &&
              person &&
              person.name &&
              person.name.toLowerCase().includes(value.toLowerCase())
            );
          })
          .map((person) => person.name); // Extraer solo la propiedad 'name' (nombre)
        
        console.log("Resultados filtrados: ", result); // Ahora 'result' solo contendrá los nombres
        // setResults(result); // Actualizar 'setResults' con los nombres
      });
  };

  const handleChange = (value)  => {
    setSearchTerm(value)
    fetchData(value)
  }

  return (
    <div className="containerInput">
      <form onSubmit={handleSearch}>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Link className="btn btn-outline-success" type="submit">
            <div className="d-flex align-items-center">
              <i className="fa fa-search me-2" style={{ color: "#f8d00d" }}></i>Search 
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
};