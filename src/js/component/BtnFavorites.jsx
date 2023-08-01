import React, {useContext} from "react";
import { Context } from "../store/appContext.js";

export const BtnFavorites = () => {

    const {store, actions} = useContext(Context);
    const myFavorites = store.favorites;

   return (
    <div className="dropdown me-5">
        <button className="btn btn-danger dropdown-toggle text-white" type="button" data-bs-toggle="dropdown">
            <b>Favorites</b>
            <span className="position-absolute top-0 start-100 text-dark translate-middle badge rounded-circle bg-warning">
                {myFavorites.length}
            </span>
        </button>
        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
            {myFavorites.length === 0 ? (
                <li><span className="dropdown-item">No Favorites selected</span></li>
            ) : (
                myFavorites.map((item, index)=>(
                    <li key={index} className="d-flex align-items-center">
                        <span className="dropdown-item">{item}</span>
                        <button type="button" className="btn btn-outline-danger me-2" onClick={()=>{actions.removeFavorite(item)}} >
                            <i className="fas fa-trash"></i> 
                        </button>  
                    </li> 
                ))
            )}
        </ul>
    </div>
   )
    
}
