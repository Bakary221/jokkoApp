import { itemsSideBar } from "../const";


export function renderView(index , conteneur){

    const name = itemsSideBar[index];
    name(conteneur);
}

