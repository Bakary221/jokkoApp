import { store } from "../store/store.js";
import { fetchOnly, addGroup } from "../services/api.js";
import { router } from "../router.js";

export async function renderFormAddGroupe() {
  const state = store.getState();
  const currentUser = state.currentUser;
  const allUsers = await fetchOnly("users");

  // Ne garder que les contacts du currentUser
  const contactUsers = allUsers.filter(u => currentUser.contacts.includes(Number(u.id)));

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  overlay.id = 'popup-add-group';

  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-2xl shadow-2xl w-[500px] p-8 relative max-h-[90vh] overflow-y-auto animate-fade-in-down';

  const contactCheckboxes = contactUsers.map(c => {
    const label = `${c.nom} ${c.prenom} (${c.telephone})`;
    return `
      <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
        <input 
          type="checkbox" 
          name="membres_existants[]" 
          value="${c.id}" 
          class="bg-blue-600 w-4 h-4"
        />
        <span class="text-gray-700">${label}</span>
      </label>
    `;
  }).join('');

  modal.innerHTML = `
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Créer un groupe</h2>
    <form id="form-add-group" class="flex flex-col gap-5">
      <div class="relative">
        <i class="fa-solid fa-users absolute top-3 left-3 text-gray-400"></i>
        <input 
          type="text" 
          name="nom_groupe" 
          placeholder="Nom du groupe"
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        />
        <div class="text-red-500 text-sm mt-1 hidden" id="error-nom_groupe"></div>
      </div>

      <div class="relative">
        <i class="fa-solid fa-align-left absolute top-3 left-3 text-gray-400"></i>
        <textarea 
          name="description" 
          placeholder="Description du groupe" 
          rows="3"
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>
        <div class="text-red-500 text-sm mt-1 hidden" id="error-description"></div>
      </div>

      <div>
        <label class="font-semibold mb-2 block">Membres existants (contacts)</label>
        <div class="border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto space-y-2">
          ${contactCheckboxes || '<p class="text-sm text-gray-400">Aucun contact disponible</p>'}
        </div>
        <div class="text-red-500 text-sm mt-1 hidden" id="error-membres_existants"></div>
      </div>

      <div class="border-t pt-4">
        <label class="font-semibold mb-2 block">Ajouter un membre hors contact</label>
        <div class="flex gap-1 mb-2">
          <input 
            type="text" 
            name="new_nom" 
            placeholder="Nom" 
            class="w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:border-blue-500"
          />
          <input 
            type="text" 
            name="new_prenom" 
            placeholder="Prénom" 
            class="w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input 
          type="tel" 
          name="new_tel" 
          placeholder="Téléphone" 
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div class="text-red-500 text-sm mt-1 hidden" id="error-new_membre"></div>
      </div>

      <button 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Créer le groupe
      </button>
    </form>

    <button 
      id="close-popup-group" 
      class="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
    >
      &times;
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById('close-popup-group').addEventListener('click', () => {
    overlay.remove();
  });

  document.getElementById('form-add-group').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const nomGroupe = formData.get("nom_groupe").trim();
    const description = formData.get("description").trim();
    const membres = formData.getAll("membres_existants[]").map(id => Number(id));

    const newNom = formData.get("new_nom").trim();
    const newPrenom = formData.get("new_prenom").trim();
    const newTel = formData.get("new_tel").trim();

    // Réinitialiser erreurs
    ["nom_groupe", "description", "membres_existants", "new_membre"].forEach(id => {
      document.getElementById(`error-${id}`).classList.add("hidden");
      document.getElementById(`error-${id}`).textContent = "";
    });

    // Validation
    let hasError = false;

    if (!nomGroupe) {
      document.getElementById("error-nom_groupe").textContent = "Le nom du groupe est requis.";
      document.getElementById("error-nom_groupe").classList.remove("hidden");
      hasError = true;
    }

    if (!description) {
      document.getElementById("error-description").textContent = "La description est requise.";
      document.getElementById("error-description").classList.remove("hidden");
      hasError = true;
    }

    if (membres.length === 0 && (!newNom || !newPrenom || !newTel)) {
      document.getElementById("error-membres_existants").textContent = "Veuillez ajouter au moins un membre.";
      document.getElementById("error-membres_existants").classList.remove("hidden");
      hasError = true;
    }

    if ((newNom || newPrenom || newTel) && (!newNom || !newPrenom || !newTel)) {
      document.getElementById("error-new_membre").textContent = "Remplir tous les champs pour ajouter un membre hors contact.";
      document.getElementById("error-new_membre").classList.remove("hidden");
      hasError = true;
    }

    if (hasError) return;

    // Ajouter le membre hors contact (ici juste le tel pour le moment)
    if (newNom && newPrenom && newTel) {
      membres.push(newTel); // ou créer un user complet si tu veux
    }
    membres.push(Number(currentUser.id));
    const nouveauGroupe = {
      id: Date.now().toString(),
      name: nomGroupe,
      avatar: nomGroupe.substring(0, 2).toUpperCase(),
      members: membres,
      admins: [currentUser.id],
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      archive: false
    };

    try {
      const res = await addGroup(nouveauGroupe);
      console.log("Groupe créé :", res);
      router('/home')
      overlay.remove();
    } catch (err) {
      alert("Erreur lors de la création du groupe");
    }
  });
}
