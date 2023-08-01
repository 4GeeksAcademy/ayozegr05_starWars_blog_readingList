import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const GetPlanets = () => {
    const { store, actions } = useContext(Context);
    const [planets, setPlanets] = useState(JSON.parse(localStorage.getItem("planetsLocal")));
    

    return (
        <div className="container-fluid px-5">
          <h1 className="text-center my-4  text-info letra"><b><i>Planets</i></b></h1>
          <div className="row px-5">
            {planets.results.map(planet => (
              <div className="col-md-2" style={{ width: "20%" }} key={planet.uid}>
                <div className="card my-4">
                  <img
                    src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                    onError={(e) => {
                      e.target.src = "https://1.bp.blogspot.com/-KoRhKcCHwBE/Tndslf5GHYI/AAAAAAAAZk4/8Ihcjjwr7Wg/s1600/freebies2deals-star-wars-6-set.jpg";
                    }}
                    alt="Not found"
                    className="bordesimggrid"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{planet.name}</h5>
                    <div className="card-footer d-flex justify-content-between bg-white">
                      <Link to={`/planets/${planet.uid}`} className="btn btn-cutline-secondary bg-secondary me-2 d-flex align-items-center">
                        <i className="fas fa-eye fs-4 pe-2"></i> <b> Learn more...</b> 
                      </Link>
                      <button className="btn btn-danger" onClick={()=>{actions.addFavorite(planet.name)}}>
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
      