import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
  <div className="text-center mt-5">
    <div className="image-container">
    <Link to="/people/">
        <div className="image-wrapper pe-5">
          <img src="https://lamula.pe/media/uploads/21606084-b641-451f-8f1e-ec89245ffebc.jpg" alt="Characters" />
          <span className="image-text-overlay text-danger letra"><i>Characters</i></span>
        </div>
      </Link>
      <Link to="/vehicles/">
        <div className="image-wrapper ps-5">
          <img src="https://www.cnet.com/a/img/resize/8364177c9fdeddb3a35b8434a164b6f29619bd93/hub/2015/02/05/11b50968-7eef-47da-a344-33ebe0d18be0/star-wars-vehicles-at-at.jpg?auto=webp&width=1200" alt="Vehicles" />
          <span className="image-text-overlay text-warning letra"><i>Vehicles</i></span>
        </div>
      </Link>
    </div>
    <div className="image-container">
      <Link to="/species/">
        <div className="image-wrapper pe-5">
          <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/03/cutest-star-wars-species-max-rebo-grogu-wicket.jpg" alt="Species" />
          <span className="image-text-overlay text-white letra"><i>Species</i></span>
        </div>
      </Link>
      <Link to="/planets/">
        <div className="image-wrapper ps-5">
          <img src="https://exoplanets.nasa.gov/internal_resources/116" alt="Planets" />
          <span className="image-text-overlay text-success letra"><i>Planets</i></span>
        </div>
      </Link>
    </div>
  </div>
);
