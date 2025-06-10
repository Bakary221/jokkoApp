import { getContactsWithMessages } from "../components/components";
import { store } from "../store/store";


export function renderMessagesUsers(conteneur) {
  const contacts = getContactsWithMessages(store.getState());

  const messageList = document.createElement('ul');
  messageList.className = 'flex flex-col gap-2 overflow-y-auto';
  messageList.setAttribute('id', 'users');

  contacts.forEach(contact => {
    const { user, lastMessage, lastTime, unreadCount } = contact;

    if (!user || !user.prenom || !user.nom) return;

    const fullName = `${user.prenom} ${user.nom}`;
    const initials = user.avatar || `${user.prenom[0]}${user.nom[0]}`.toUpperCase();

    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
          <div class="w-3 h-3 bg-${user.status === 'online' ? 'green' : 'gray'}-500 rounded-full absolute right-1 top-8"></div>
        </div>
        <div>
          <div class="font-bold">${fullName}</div>
          <small>${lastMessage}</small>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm">${lastTime}</span>
        ${unreadCount > 0
          ? `<span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">${unreadCount}</span>`
          : `<span class="w-6 h-6"></span>`}
      </div>
    `;

    messageList.appendChild(li);
  });

  conteneur.innerHTML = '';
  conteneur.appendChild(messageList);
  return messageList;
}
