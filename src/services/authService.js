import { errorsMessages } from "../const";


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