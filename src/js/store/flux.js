import { stringify } from "query-string";

const getState =  ({ getStore, getActions, setStore }) => {

	return {
		store: {
			results: [],
			people: JSON.parse(localStorage.getItem("peopleLocal")) || [],
			favorites: JSON.parse(localStorage.getItem("favorites")) || [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			//definir el action que modifique el results del searchbar ----------------->
			getPeople: async () => {
				if(localStorage.getItem("peopleLocal") === null) {
					const response = await fetch("https://www.swapi.tech/api/people")
					if(response.ok){
						const data = await response.json()
						localStorage.setItem('peopleLocal', JSON.stringify(data))
					}else{
						console.log("error: ", response.status, response.statusText);
					}
				}
			},
			getPlanets: async () => {
				if(localStorage.getItem("planetsLocal") === null) {
					const response = await fetch("https://www.swapi.tech/api/planets")
					if(response.ok){
						const data = await response.json()
						localStorage.setItem('planetsLocal', JSON.stringify(data))
					}else{
						console.log("error: ", response.status, response.statusText);
					}
				}
			},
			getSpecies: async () => {
				if(localStorage.getItem("speciesLocal") === null) {
					const response = await fetch("https://www.swapi.tech/api/species")
					if(response.ok){
						const data = await response.json()
						localStorage.setItem('speciesLocal', JSON.stringify(data))
					}else{
						console.log("error: ", response.status, response.statusText);
					}
				}
			},
			getVehicles: async () => {
				if(localStorage.getItem("vehiclesLocal") === null) {
					const response = await fetch("https://www.swapi.tech/api/vehicles")
					if(response.ok){
						const data = await response.json()
						localStorage.setItem('vehiclesLocal', JSON.stringify(data))
					}else{
						console.log("error: ", response.status, response.statusText);
					}
				}
			},
			searchBar: (searchTerm) => {
				console.log("searchTerm:", searchTerm);
				const storedPeople = JSON.parse(localStorage.getItem("peopleLocal")) || { results: [] };
				const storedPlanets = JSON.parse(localStorage.getItem("planetsLocal")) || { results: [] };
				const storedSpecies = JSON.parse(localStorage.getItem("speciesLocal")) || { results: [] };
				const storedVehicles = JSON.parse(localStorage.getItem("vehiclesLocal")) || { results: [] };
			  
				const resultsArray = [
				  ...storedPeople.results,
				  ...storedPlanets.results,
				  ...storedSpecies.results,
				  ...storedVehicles.results,
				];
			  
				// Filtrar solo los objetos que contengan la propiedad 'name'
				const filteredResults = resultsArray.filter((item) => {
				  if (item.name) {
					const isMatch = item.name.toLowerCase().includes(searchTerm?.toLowerCase());
					console.log(`Searching for '${searchTerm}', found '${item.name}'. Match? ${isMatch}`);
					return isMatch;
				  } else {
					console.log(`Item with id '${item.uid}' does not have a 'name' property.`);
					return false;
				  }
				});
			  
				// Actualiza el estado global 'results' con los resultados filtrados
				setStore({ results: filteredResults });
			  },
			  
			addFavorite: (nameCharacter) => {
			const FavoritesList = getStore().favorites; // Obtenemos la lista actual de favoritos
			const isDuplicate = FavoritesList.some((favorite) => favorite === nameCharacter); // Verificamos si el título ya está en la lista de favoritos
			if (!isDuplicate) {  // Si no es un duplicado, creamos una nueva (copia) lista de favoritos más el nuevo título
				const newFavorites = [...FavoritesList, nameCharacter];
				setStore({ favorites: newFavorites });  // Actualizamos el estado del contexto con la nueva lista de favoritos
				localStorage.setItem("favorites", JSON.stringify(newFavorites));  // Almacenamos la nueva lista de favoritos en el localStorage
			}
			},
            removeFavorite: (nameCharacter) => {
				const FavoritesList = getStore().favorites;
				const listRemove = FavoritesList.filter((favorite)=> favorite != nameCharacter);
				setStore({favorites: listRemove});
				localStorage.setItem("favorites", JSON.stringify(listRemove));
			},
				}
			}
			
		}
	


export default getState;
