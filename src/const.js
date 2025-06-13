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
    TelephoneAndPassword : "Le Telephone ou Mot de passe incorrecte. Reessaye!",
    champsNom : "Le champs nom ne peut pas etre vide.",
    champsPrenom : "Le champs prenom ne peut pas etre vide.",
    champsTelephone : "Le champs telephone ne peut pas etre vide",
    formatNumero : "Le format du numero est invalide.",
    userNotInJokkoApp : "L'utilisateur n'a pas de compte sur jokkoApp.",
    userAlreadyInContacts : "L'utilisateur existe déja dans votre contact."
}