import { router } from "../router";
import { getGroupsWithMessages } from "../components/components";
import { store } from "../store/store";
import { renderChat } from "./chatViews";

export function renderMessagesGroups(conteneur) {
  const { groupsWithMessages, totalUnreadMessages } = getGroupsWithMessages(store.getState());

  console.log(groupsWithMessages , totalUnreadMessages);
  
  const groupList = document.createElement('ul');
  groupList.className = 'flex flex-col gap-2 overflow-y-auto';
  groupList.setAttribute('id', 'groups');

  groupsWithMessages.forEach(({ group, lastMessage, lastTime, senderName, unreadCount }) => {
    const initials = group.avatar || group.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">${initials}</div>
        </div>
        <div>
          <div class="font-bold">${group.name}</div>
          <small>${senderName ? senderName + ' : ' : ''}${lastMessage}</small>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <span class="text-sm">${lastTime}</span>
        ${unreadCount > 0
          ? `<span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">${unreadCount}</span>`
          : `<span class="w-6 h-6"></span>`}
      </div>
    `;

    li.addEventListener('click', () => {
      store.setState({ selectedGroup: group, selectedContact: null });
      // console.log(store.getState());

      const chat = document.querySelector('#chat');
      chat.replaceWith(renderChat())
      // console.log(chat);
      
      // router('/home'); 
    });

    groupList.appendChild(li);
  });

  conteneur.innerHTML = '';

  if (totalUnreadMessages > 0) {
    const header = document.createElement('div');
    header.className = 'text-sm text-gray-700 mb-2';
    header.textContent = `Total de messages non lus : ${totalUnreadMessages}`;
    conteneur.appendChild(header);
  }

  conteneur.appendChild(groupList);
  return groupList;
}
