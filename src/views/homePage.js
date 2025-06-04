import { renderChat } from "./chatViews";
import { renderSideBar } from "./sideBarView";
import { renderView } from "../components/components";
import { renderInputSearchUsers } from "./searchInput";

export function navigationSideBar(home){
    const sideBars = home.querySelectorAll("#sideBar i");
    const conteneur = home.querySelector('#discussions');
    
    renderView(0 , conteneur);
    sideBars.forEach((sideBar , index) => {
        sideBar.addEventListener('click' , ()=>{            
            renderView(index , conteneur);
        })
    });
}

export function renderHomePage(){
    const home = document.createElement('div');
    home.className = 'flex w-full h-full';

    home.appendChild(renderSideBar());
    home.appendChild(renderInputSearchUsers());
    home.appendChild(renderChat());
    navigationSideBar(home);
    return home;
}