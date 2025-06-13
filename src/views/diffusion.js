import { getUsersAndGroups } from "../components/components";
import { store } from "../store/store";


export function renderDiffusions(conteneur) {

  const { users, groups } = getUsersAndGroups(store.getState());
  const diffusionList = document.createElement('ul');
  diffusionList.className = 'flex flex-col gap-2 overflow-y-auto';
  diffusionList.setAttribute('id', 'diffusions');

  diffusionList.innerHTML = '';
  
  // 👉 Ajouter les utilisateurs
  users.forEach(user => {
    const initials = user.prenom.charAt(0).toUpperCase() + (user.nom?.charAt(0)?.toUpperCase() || '');
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
          <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
        </div>
        <div>
          <div class="font-bold">${user.prenom} ${user.nom}</div>
          <small>${user.telephone}</small>
        </div>
      </div>
      <i class="fas fa-user text-gray-500 text-lg"></i>
    `;
    diffusionList.appendChild(li);
  });

  // 👉 Ajouter les groupes
  groups.forEach(group => {
    const initials = group.avatar || group.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
        </div>
        <div>
          <div class="font-bold">${group.name}</div>
          <small>${group.description || 'Groupe'}</small>
        </div>
      </div>
      <i class="fas fa-users text-gray-500 text-lg"></i>
    `;
    diffusionList.appendChild(li);
  });

  conteneur.innerHTML = '';
  conteneur.appendChild(diffusionList);
  return diffusionList;
}