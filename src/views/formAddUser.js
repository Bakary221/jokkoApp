export function renderFormAddUser() {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  overlay.setAttribute('id', 'popup-add-user');

  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-2xl shadow-2xl w-[420px] p-8 relative animate-fade-in-down';

  modal.innerHTML = `
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 tracking-wide">Ajouter un contact</h2>
    <form id="form-add-user" class="flex flex-col gap-5">

      <div class="relative">
        <i class="fa-solid fa-user absolute top-3 left-3 text-gray-400"></i>
        <input 
          type="text" 
          name="nom" 
          placeholder="Nom" 
          required 
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        />
      </div>

      <div class="relative">
        <i class="fa-solid fa-user-plus absolute top-3 left-3 text-gray-400"></i>
        <input 
          type="text" 
          name="prenom" 
          placeholder="Prénom" 
          required 
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        />
      </div>

      <div class="relative">
        <i class="fa-solid fa-phone absolute top-3 left-3 text-gray-400"></i>
        <input 
          type="tel" 
          name="telephone" 
          placeholder="Téléphone" 
          required 
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        />
      </div>

      <button 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Ajouter
      </button>
    </form>

    <button 
      id="close-popup" 
      class="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
    >
      &times;
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in-down {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-down {
      animation: fade-in-down 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);

  // Gestion fermeture
  document.getElementById('close-popup').addEventListener('click', () => {
    overlay.remove();
  });

  // Gestion soumission
  document.getElementById('form-add-user').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log('Nouvel utilisateur:', data);
    overlay.remove();
  });
}
