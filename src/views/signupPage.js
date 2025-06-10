import { router } from "../router";
import { showError, updateError } from "../services/authService";
import { errorsMessages } from "../const";
import { addUser, fetchOnly } from "../services/api";

export function renderSignup(store) {
  const signup = document.createElement("div");
  signup.className = "flex items-center justify-center mx-auto w-full";

  signup.innerHTML = `
    <div class="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-blue-600">Inscription JokkoApp</h1>
        <p class="text-gray-500 mt-2">Crée ton compte pour commencer</p>
        <small class="text-red-500 hidden">Message d'erreur global</small>
      </div>

      <form class="space-y-4">
        <div>
          <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input type="text" id="prenom" placeholder="Bakary"
            class="w-full border border-gray-300 rounded-lg px-4 py-2" />
          <small class="text-red-500 hidden">Erreur prénom</small>
        </div>

        <div>
          <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input type="text" id="nom" placeholder="Diassy"
            class="w-full border border-gray-300 rounded-lg px-4 py-2" />
          <small class="text-red-500 hidden">Erreur nom</small>
        </div>

        <div>
          <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="tel" id="telephone" placeholder="778627052"
            class="w-full border border-gray-300 rounded-lg px-4 py-2" />
          <small class="text-red-500 hidden">Erreur téléphone</small>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input type="password" id="password" placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-4 py-2" />
          <small class="text-red-500 hidden">Erreur mot de passe</small>
        </div>

        <button type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          S'inscrire
        </button>
      </form>

      <p class="text-center text-sm text-gray-500">
        Déjà un compte ?
        <a href="#/" class="text-blue-600 hover:underline" id="login">Connecte-toi</a>
      </p>
    </div>
  `;
  const login = signup.querySelector('#login');
  const form = signup.querySelector("form");
  const smalls = signup.querySelectorAll("small");
  const inputPrenom = signup.querySelector("#prenom");
  const inputNom = signup.querySelector("#nom");
  const inputTel = signup.querySelector("#telephone");
  const inputPass = signup.querySelector("#password");

  login.addEventListener('click' , (e)=>{
    e.preventDefault();
    router('/login');
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    updateError(smalls);
    let valid = true;

    if (inputPrenom.value.trim() === "") {
      showError(smalls[1], "Le prénom ne doit pas être vide.");
      valid = false;
    }
    if (inputNom.value.trim() === "") {
      showError(smalls[2], "Le nom ne doit pas être vide.");
      valid = false;
    }
    if (inputTel.value.trim() === "") {
      showError(smalls[3], errorsMessages.champTelephone);
      valid = false;
    }
    if (inputPass.value.trim() === "") {
      showError(smalls[4], errorsMessages.champPassword);
      valid = false;
    }

    if (!valid) return;

    const users = await fetchOnly("users");
    const exist = users.find(u => u.telephone === inputTel.value.trim());

    if (exist) {
      showError(smalls[0], "Le téléphone est déjà utilisé.");
      return;
    }

    const prenom = inputPrenom.value.trim();
    const nom = inputNom.value.trim();
    const telephone = inputTel.value.trim();
    const password = inputPass.value.trim();

    const avatar = (prenom[0] + nom[0]).toUpperCase();
    const userss = store.getState().users;
    const maxId = userss.length > 0 ? Math.max(...userss.map(u => u.id)) : 0;

    const newUser = {
      id: maxId + 1,
      login: prenom.toLowerCase(), // ou un slug unique
      nom,
      prenom,
      telephone,
      avatar,
      status: "online",
      lastSeen: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contacts: [],
      password,
      archive: false,
    };

    const savedUser = await addUser(newUser);
    localStorage.setItem("user_id", savedUser.id);
    store.setState({ currentUser: savedUser, users: [...users, savedUser] });

    router("/home"); 
  });

  return signup;
}
