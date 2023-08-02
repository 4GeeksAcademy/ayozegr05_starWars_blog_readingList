// ViewResults.jsx
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ViewResults = () => {
  const { store, actions } = useContext(Context);
  const results = store.results || []; // Si store.results es undefined, asignamos un array vacío
  console.log("RESULTADOS: ", results)

  return (
    <div className="container-fluid px-5">
      <h1 className="text-center my-4 text-info letra">
        <b>
          <i>Search Results</i>
        </b>
      </h1>
      <div className="row px-5">
        {results.map((person) => (
          <div className="col-md-2" style={{ width: "20%" }} key={person.uid}>
            <div className="card my-4">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                onError={(e) => {
                  e.target.src = "./assets/img/placeholder.jpg";
                }}
                alt={person.name}
                className="bordesimggrid"
              />
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <div className="card-footer d-flex justify-content-between bg-white">
                  <Link
                    to={`/people/${person.uid}`}
                    className="btn btn-cutline-secondary bg-secondary me-2 d-flex align-items-center"
                  >
                    <i className="fas fa-eye fs-4 pe-2"></i> <b> Learn more...</b>
                  </Link>
                  <button className="btn btn-danger" onClick={()=>{actions.addFavorite(person.name)}}>
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
