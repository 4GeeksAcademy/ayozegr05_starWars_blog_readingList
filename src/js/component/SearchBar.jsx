import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // Usa el hook useNavigate para acceder a la función de navegación

  const handleSearch = async (event) => {
    event.preventDefault();

    const term = searchTerm // Elimina los espacios en blanco al inicio y al final del término de búsqueda

    if (term === "") {
      // Si la barra de búsqueda está vacía, no hagas nada
      return;
    }
    // Asegura que searchTerm tenga un valor válido (cadena vacía si es undefined o null)
    // const term = searchTerm || "";

    // Llama a la acción 'searchBar' del contexto para filtrar los resultados almacenados en el localStorage
    actions.searchBar(term);

    // Limpia el campo de búsqueda
    setSearchTerm("");

    // Redirige al usuario a la ruta /results utilizando la función de navegación
    navigate("/results");
  };

  const handleChange = (value) => {
    setSearchTerm(value);
  };

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
          <button type="submit" className="btn btn-outline-success">
            <div className="d-flex align-items-center">
              <i className="fa fa-search me-2" style={{ color: "#f8d00d" }}></i>Search
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
