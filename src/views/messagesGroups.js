export function renderMessagesGroups(conteneur) {

  const groupList = document.createElement('ul');
  groupList.className = 'flex flex-col gap-2 overflow-y-auto';
  groupList.setAttribute('id', 'groups');

  groupList.innerHTML = `      
    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">JD</div>
        </div>
        <div>
          <div class="font-bold">Jokko Devs</div>
          <small>Anna : Salut les devs !</small>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm">11:45</span>
        <span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">3</span>
      </div>
    </li>

    <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">SA</div>
        </div>
        <div>
          <div class="font-bold">Sonatel Academy</div>
          <small>Gorgui : Réunion à 16h</small>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm">09:12</span>
        <span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">1</span>
      </div>
    </li>`;

  conteneur.innerHTML = '';
  conteneur.appendChild(groupList);
  return groupList;
}
