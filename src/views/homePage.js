import { renderChat } from "./chatViews";
import { renderSideBar } from "./sideBarView";
import { renderView } from "../components/components";
import { renderInputSearchUsers } from "./searchInput";
import { renderFormAddGroupe } from "./formAddGroup";


export function navigationSideBar(home){
    const sideBars = home.querySelectorAll("#sideBar i");
    const conteneur = home.querySelector('#discussions');
    const titre = home.querySelector('#titre');
    console.log(titre);
    
    renderView(0 , conteneur);
    sideBars.forEach((sideBar , index) => {
        
        sideBar.addEventListener('click' , ()=>{ 
            sideBars.forEach(el => {
            el.classList.remove('bg-blue-300')
        });
            sideBar.classList.add('bg-blue-300')
            titre.textContent = sideBar.getAttribute("id");
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

    const addGroupe =  home.querySelector('#addGroupe');
    addGroupe.addEventListener('click' , renderFormAddGroupe);
    
    return home;
}

