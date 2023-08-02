import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ViewResults = () => {
  const { store, actions } = useContext(Context);
  const results = store.results || [];

  const generateUniqueKey = (item) => {
    return `${item.type}-${item.uid}`;
  };

  const getImageUrl = (type, uid) => {
    if (type === "people") {
      // Enlace de imagen predeterminado para personajes
      return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
    } else {
      // Enlace de imagen para vehículos, especies y planetas
      return `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
    }
  };

  // Agregar el tipo de elemento a cada resultado
  const resultsWithType = results.map((item) => {
    const type = item.url.split("/")[4];
    return { ...item, type };
  });

  return (
    <div className="container-fluid px-5">
       <h1 className="text-center my-4 text-info letra">
        <b>
          <i>{resultsWithType.length > 0 ? 
          <div className="d-flex justify-content-center pe-3"><i className="fas fa-search ms-1"> Search Results </i></div> : <div><i className="fas fa-exclamation-triangle"> No results found </i></div>}</i>
        </b>
      </h1>
      <div className="row px-5">
        {resultsWithType.map((item) => (
          <div className="col-md-2" style={{ width: "20%" }} key={generateUniqueKey(item)}>
            <div className="card my-4">
              <img
                src={getImageUrl(item.type, item.uid)}
                onError={(e) => {
                  e.target.src = "https://1.bp.blogspot.com/-KoRhKcCHwBE/Tndslf5GHYI/AAAAAAAAZk4/8Ihcjjwr7Wg/s1600/freebies2deals-star-wars-6-set.jpg";
                }}
                alt={item.name}
                className="bordesimggrid"
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="card-footer d-flex justify-content-between bg-white">
                  <Link
                    to={`/${item.type}/${item.uid}`}
                    className="btn btn-cutline-secondary bg-secondary me-2 d-flex align-items-center"
                  >
                    <i className="fas fa-eye fs-4 pe-2"></i> <b> Learn more...</b>
                  </Link>
                  <button className="btn btn-danger" onClick={() => { actions.addFavorite(item.name) }}>
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
