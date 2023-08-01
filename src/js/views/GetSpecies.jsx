import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const GetSpecies = () => {
    const { store, actions } = useContext(Context);
    const [species, setSpecies] = useState(JSON.parse(localStorage.getItem("speciesLocal")));
    

    return (
        <div className="container-fluid px-5">
          <h1 className="text-center my-4  text-info letra"><b><i>Species</i></b></h1>
          <div className="row px-5">
            {species.results.map(specie => (
              <div className="col-md-2" style={{ width: "20%" }} key={specie.uid}>
                <div className="card my-4">
                  <img
                    src={`https://starwars-visualguide.com/assets/img/species/${specie.uid}.jpg`}
                    onError={(e) => {
                      e.target.src = "./assets/img/placeholder.jpg";
                    }}
                    alt={specie.name} 
                    className="bordesimggrid"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{specie.name}</h5>
                    <div className="card-footer d-flex justify-content-between bg-white">
                      <Link to={`/species/${specie.uid}`} className="btn btn-cutline-secondary bg-secondary me-2 d-flex align-items-center">
                        <i className="fas fa-eye fs-4 pe-2"></i> <b> Learn more...</b> 
                      </Link>
                      <button className="btn btn-danger" onClick={()=>{actions.addFavorite(specie.name)}}>
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
      