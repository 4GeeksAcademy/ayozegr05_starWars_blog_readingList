
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BtnFavorites } from "./BtnFavorites.jsx";
import { SearchBar } from "./SearchBar.jsx";

export const Navbar = () => {

	const {store} =  useContext(Context)
	const [results, setResults] = useState([])
	return (
		<nav className="navbar navbar-dark black border-warning border-bottom pt-4 pb-3">
		  
		<div className="d-flex">
			<Link to="/">
				<button
				className="navbar-brand  ms-5 mb-0 h1"
				style={{ padding: "0", border: "none", background: "none" }}
				>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10IJ6Qf4SKN0vYsNN1v8FTcQgqlFV3Ol7iE9fW7uvJXX5InFubJAf_KXftmdZ0RcZq9Y&usqp=CAU"
					alt="Home"
					style={{ width: "100px", height: "auto" }}
				/>
				</button>
		  </Link>
		  <div className="ms-5 d-flex align-items-center">
			<div className="me-3">
				<Link to="/species/">
				<button className="btn btn-warning"><b>Species</b></button>
				</Link>
			</div>
			<div className="me-3">
				<Link to="/vehicles/">
				<button className="btn btn-warning"><b>Vehicles</b></button>
				</Link>
			</div>
			<div className="me-3">
				<Link to="/people/">
				<button className="btn btn-warning"><b>Characters</b></button>
				</Link>
			</div>
			<div>
				<Link to="/planets/">
				<button className="btn btn-warning"><b>Planets</b></button>
				</Link>
			</div>
		  </div>
		</div>
			<SearchBar />
			<BtnFavorites />
		</nav>
	  );
};
