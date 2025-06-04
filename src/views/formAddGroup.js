export function renderFormAddGroupe() {
  const contacts = [
    { nom: 'Diallo', prenom: 'Awa', telephone: '770000001' },
    { nom: 'Ba', prenom: 'Moussa', telephone: '770000002' },
    { nom: 'Sow', prenom: 'Fatou', telephone: '770000003' },
    { nom: 'Diallo', prenom: 'Awa', telephone: '770000001' },
    { nom: 'Ba', prenom: 'Moussa', telephone: '770000002' },
    { nom: 'Sow', prenom: 'Fatou', telephone: '770000003' },
  ];

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  overlay.id = 'popup-add-group';

  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-2xl shadow-2xl w-[500px] p-8 relative max-h-[90vh] overflow-y-auto animate-fade-in-down';

  const contactCheckboxes = contacts.map(c => {
    const label = `${c.nom} ${c.prenom} (${c.telephone})`;
    return `
      <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
        <input 
          type="checkbox" 
          name="membres_existants[]" 
          value="${c.telephone}" 
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
          required
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        />
      </div>

      <div class="relative">
        <i class="fa-solid fa-align-left absolute top-3 left-3 text-gray-400"></i>
        <textarea 
          name="description" 
          placeholder="Description du groupe" 
          rows="3"
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>
      </div>

      <div>
        <label class="font-semibold mb-2 block">Membres existants (contacts)</label>
        <div class="border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto space-y-2">
          ${contactCheckboxes || '<p class="text-sm text-gray-400">Aucun contact disponible</p>'}
        </div>
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

  // Fermer la popup
  document.getElementById('close-popup-group').addEventListener('click', () => {
    overlay.remove();
  });

  // Empêcher l'envoi (pas de backend)
  document.getElementById('form-add-group').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const membres = formData.getAll('membres_existants[]');
    console.log({ ...data, membres_existants: membres });
    overlay.remove();
  });
}
