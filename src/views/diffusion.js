export function renderDiffusions(conteneur) {
  const diffusionList = document.createElement('ul');
  diffusionList.className = 'flex flex-col gap-2 overflow-y-auto';
  diffusionList.setAttribute('id', 'diffusions');

  diffusionList.innerHTML = `

    <!-- Utilisateur -->
    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">ND</div>
          <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
        </div>
        <div>
          <div class="font-bold">Ndeye Diop</div>
          <small>Contact personnel</small>
        </div>
      </div>
      <i class="fas fa-user text-gray-500 text-lg"></i>
    </li>

    <!-- Groupe -->
    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">P7</div>
        </div>
        <div>
          <div class="font-bold">Promo 7</div>
          <small>Groupe de formation</small>
        </div>
      </div>
      <i class="fas fa-users text-gray-500 text-lg"></i>
    </li>

    <!-- Autre utilisateur -->
    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">AD</div>
          <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
        </div>
        <div>
          <div class="font-bold">Anna Diarra</div>
          <small>Contact personnel</small>
        </div>
      </div>
      <i class="fas fa-user text-gray-500 text-lg"></i>
    </li>

    <!-- Autre groupe -->
    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">WG</div>
        </div>
        <div>
          <div class="font-bold">Web Group</div>
          <small>Groupe de travail</small>
        </div>
      </div>
      <i class="fas fa-users text-gray-500 text-lg"></i>
    </li>`;

  conteneur.innerHTML = '';
  conteneur.appendChild(diffusionList);
  return diffusionList;
}
