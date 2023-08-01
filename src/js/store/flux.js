import { stringify } from "query-string";

const getState =  ({ getStore, getActions, setStore }) => {

	return {
		store: {
			//results = []
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
			// searchBar: (searchTerm) => {
				
			// 	const storedPeople = JSON.parse(localStorage.getItem("peopleLocal")) || { results: [] };
			// 	console.log("storedPeople:", storedPeople);
			// 	const resultsArray = Array.isArray(storedPeople.results) ? storedPeople.results : [];
			// 	console.log("resultsArray:", resultsArray);
			  
			// 	// Filtrar solo los objetos que contengan la propiedad 'name'
			// 	const filteredPeople = resultsArray.filter((person) => person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase()));
			  
			// 	// Muestra los resultados filtrados en la interfaz sin modificar el estado 'people'
			// 	console.log("filteredPeople:", filteredPeople);
			// }, 
			
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
