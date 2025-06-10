import { renderMessagesUsers } from "./views/messagesUsers";
import { renderMessagesGroups } from "./views/messagesGroups";
import { renderDiffusions } from "./views/diffusion";
import { renderFormAddUser } from "./views/formAddUser";
import { renderArchives } from "./views/archiveUsersAndGroups";

export const itemsSideBar = {
    0 : (conteneur)=>{renderMessagesUsers(conteneur)}, 
    1 : (conteneur)=>{renderMessagesGroups(conteneur)}, 
    2 : (conteneur)=>{renderDiffusions(conteneur)},
    3 : (conteneur)=>{renderArchives(conteneur)},
    4 : (conteneur)=>{renderFormAddUser(conteneur)},
    // 5 : logout,
};



export const errorsMessages = {
    champTelephone : "Le Numéro de telephone ne doit pas etre vide.",
    champPassword : "Le Mot de passe ne doit pas etre vide.",
    TelephoneAndPassword : "Le Telephone ou Mot de passe incorrecte. Reessaye!"
}