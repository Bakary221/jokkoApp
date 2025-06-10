import { getArchivedUsersAndGroups } from "../components/components";
import { store } from "../store/store";

export function renderArchives(conteneur) {
  const { users, groups } = getArchivedUsersAndGroups(store.getState());

  console.log(users , groups);
  
  const archiveList = document.createElement('ul');
  archiveList.className = 'flex flex-col gap-2 overflow-y-auto';
  archiveList.setAttribute('id', 'archives');

  // Vider le conteneur au préalable
  conteneur.innerHTML = '';

  // Utilisateurs archivés
  users.forEach(user => {
    const initials = user.prenom.charAt(0).toUpperCase() + (user.nom?.charAt(0)?.toUpperCase() || '');
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
        </div>
        <div>
          <div class="font-bold">${user.prenom} ${user.nom}</div>
          <small>${user.telephone}</small>
        </div>
      </div>
      <i class="fas fa-user-slash text-gray-500 text-lg"></i>
    `;

    archiveList.appendChild(li);
  });

  // Groupes archivés
  groups.forEach(group => {
    const initials = group.avatar || group.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
        </div>
        <div>
          <div class="font-bold">${group.name}</div>
          <small>${group.description || 'Groupe archivé'}</small>
        </div>
      </div>
      <i class="fas fa-users-slash text-gray-500 text-lg"></i>
    `;

    archiveList.appendChild(li);
  });

  conteneur.appendChild(archiveList);
  return archiveList;
}