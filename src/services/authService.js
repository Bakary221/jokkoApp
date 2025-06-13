import { errorsMessages } from "../const";
import { store } from "../store/store";
import { updateUser } from "./api";


export function loginUser(telephone , password , users){
    return  users.find(user => user.telephone === telephone && user.password === password);
}

export function showError(element , message){    
    element.textContent = message;
    element.classList.remove('hidden');
}

export function updateError(elements){
    elements.forEach(element => {
        element.classList.add('hidden');
    });
}

export function valideUser(telephone , password , smalls , users){
    let ok = true;
     if (telephone === '') {
        showError(smalls[1] , errorsMessages.champTelephone);
        ok = false;
    }
    if (password === '') {
        showError(smalls[2] , errorsMessages.champPassword);
        ok = false;
    }
    if (ok) {
        updateError(smalls);
        const user = loginUser(telephone , password , users);
        if (!user) {
            showError(smalls[0] , errorsMessages.TelephoneAndPassword);
        }
        return user;
    }
}

function validerNumeroInternational(numero) {
  const regex = /^\+?[1-9]\d{6,14}$/;
  return regex.test(numero);
}



export async function AjouterUser(form) {
    const inputs = form.querySelectorAll('input');
    const smalls = form.querySelectorAll('small');
    let ok = true;
    const state = store.getState();

    if (inputs[0].value.trim() === "") {
        showError(smalls[1], errorsMessages.champsNom);
        ok = false;
    }

    if (inputs[1].value.trim() === "") {
        showError(smalls[2], errorsMessages.champsPrenom);
        ok = false;
    }

    if (inputs[2].value.trim() === "") {
        showError(smalls[3], errorsMessages.champsTelephone);
        ok = false;
        return false;
    }

    if (ok) {
        if (!validerNumeroInternational(inputs[2].value.trim())) {
            showError(smalls[3], errorsMessages.formatNumero);
            return false;
        } else {
            const currentUser = state.currentUser;
            const user = state.users.find(u => u.telephone === inputs[2].value.trim() && currentUser.telephone !== inputs[2].value.trim());

            if (!user) {
                updateError(smalls);
                showError(smalls[0], errorsMessages.userNotInJokkoApp);
                return false;
            } else {
                // Vérifier si l'ID est déjà dans les contacts
                if (currentUser.contacts.includes(Number(user.id))) {
                    updateError(smalls);
                    showError(smalls[0], errorsMessages.userAlreadyInContacts);
                    return false;
                }
                
                updateError(smalls);
                currentUser.contacts.push(Number(user.id));
                const updated = await updateUser(currentUser.id, currentUser);
                console.log("Utilisateur mis à jour :", updated);
                store.setState({ currentUser: updated });
                return true;
            }
        }
    }

    return false;
}