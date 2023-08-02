import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { GetPeople } from "./views/GetPeople.jsx";
import { SinglePeople } from "./views/SinglePeople.jsx";
import { SinglePlanet } from "./views/SinglePlanet.jsx";
import { GetPlanets } from "./views/GetPlanets.jsx";
import { GetSpecies } from "./views/GetSpecies.jsx";
import { SingleSpecie } from "./views/SingleSpecie.jsx";
import { GetVehicles } from "./views/GetVehicles.jsx";
import { SingleVehicle } from "./views/SingleVehicle.jsx";
import { ViewResults } from "./views/ViewResults.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/people/:peopleId" element={<SinglePeople />} />
						<Route path="/planets/:planetId" element={<SinglePlanet />} />
						<Route path="/species/:speciesId" element={<SingleSpecie />} />
						<Route path="/vehicles/:vehiclesId" element={<SingleVehicle />} />
						<Route path="*" element={<h1>Not found!</h1>} />
						<Route path="/people/" element={<GetPeople />} />
						<Route path="/planets/" element={<GetPlanets/>} />
						<Route path="/species/" element={<GetSpecies/>} />
						<Route path="/vehicles/" element={<GetVehicles/>} />
						<Route path="/results" element={<ViewResults />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
