import { router } from "../router";
import { valideUser } from "../services/authService";

export function renderLogin(store){
   
    const login = document.createElement('div');
    login.className = 'flex items-center justify-center mx-auto w-full';

    login.innerHTML = `
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <!-- Logo / Titre -->
        <div class="text-center">
            <h1 class="text-3xl font-bold text-blue-600">JokkoApp</h1>
            <p class="text-gray-500 mt-2">Connecte-toi pour continuer</p>
            <small class = "text-red-500 hidden">Error Message</small>
        </div>

        <!-- Formulaire -->
        <form class="space-y-4">
            <!-- Champ Téléphone -->
            <div>
            <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" id="telephone" name="telephone" placeholder="+221 77 123 45 67"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <small class = "text-red-500 hidden">Error Message</small>
            </div>

            <!-- Champ Mot de passe -->
            <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="••••••••"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <small class = "text-red-500 hidden">Error Message</small>
            
            </div>

            <!-- Bouton de connexion -->
            <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            Se connecter
            </button>
        </form>

        <!-- Lien vers inscription (optionnel) -->
        <p class="text-center text-sm text-gray-500">
            Pas encore de compte ?
            <a href="#" class="text-blue-600 hover:underline" id="signup">Inscris-toi</a>
        </p>
    </div>`;
    const signup = login.querySelector('#signup');
    signup.addEventListener('click' , (e)=>{
        e.preventDefault();
        router('/signup');
    })
    const btnLogin = login.querySelector("form");
    btnLogin.addEventListener('submit' , (e) => {
        
        e.preventDefault();
        const telephone = login.querySelector('#telephone');
        const password = login.querySelector('#password');
        const smalls = login.querySelectorAll('small');
       
       const user = valideUser(telephone.value.trim(), password.value.trim(), smalls, store.getState().users);
        if (user) {
            localStorage.setItem('user_id', user.id); // juste l’ID
            store.setState({ currentUser: user });    // mettre dans le store
            router('/home');
        }
       
    })
    return login;
}