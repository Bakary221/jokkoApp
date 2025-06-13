import { router } from "../router";
import { addMessage, updateMessage, addGroupMessage } from "../services/api";
import { store } from "../store/store";
import { renderMessagesGroups } from "./messagesGroups";

function markMessagesAsSeen(messages, currentUserId, otherUserId) {
  messages.forEach(msg => {
    if (msg.senderId == otherUserId && msg.receiverId == currentUserId && !msg.seen) {
      msg.seen = true;
      updateMessage(msg.id, { seen: true });
    }
  });
}

function markGroupMessagesAsSeen(groupMessages, groupId, userId) {
  groupMessages.forEach(msg => {
    if (msg.groupId == groupId && !msg.seenBy.includes(userId)) {
      msg.seenBy.push(userId);
      updateMessage(msg.id, { seenBy: msg.seenBy });
    }
  });
}

export function renderChat() {
  const state = store.getState();
  const { currentUser, selectedContact, selectedGroup, users, messages, groupMessages, groups } = state;

  const chat = document.createElement("section");
  chat.className = "flex-1 p-5 flex flex-col h-full";
  chat.setAttribute('id', 'chat');

  if (!selectedContact && !selectedGroup) {
    chat.innerHTML = `
      <div class="text-gray-500 flex items-center justify-end gap-5 mb-5 sticky top-0 bg-white z-10 py-2">
        <i class="fa-solid fa-bell"></i>
        <div class="w-10 h-10 bg-blue-500 text-white flex font-bold items-center justify-center rounded-full">${currentUser.avatar}</div>
      </div>
      <div class="flex-1 flex items-center justify-center text-gray-400 text-lg font-semibold">
        Aucune conversation sélectionnée. Choisis un contact ou un groupe.
      </div>
    `;
    return chat;
  }

  let conversationHTML = "";
  let headerHTML = "";
  let sendMessageHandler;

  // === Conversation privée ===
  if (selectedContact) {
    const contact = users.find(u => u.id == selectedContact.id);
    const conversation = messages.filter(
      msg =>
        (msg.senderId == currentUser.id && msg.receiverId == contact.id) ||
        (msg.senderId == contact.id && msg.receiverId == currentUser.id)
    );

    markMessagesAsSeen(messages, currentUser.id, selectedContact.id);

    headerHTML = `
      <div class="flex items-center gap-2 mb-4">
        <div class="relative">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">${contact.avatar}</div>
          <div class="w-3 h-3 ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"} rounded-full absolute right-1 top-8"></div>
        </div>
        <div>
          <div class="font-bold">${contact.prenom} ${contact.nom}</div>
          <span class="text-sm">${contact.status === "online" ? "en ligne" : "vu à " + contact.lastSeen}</span>
        </div>
      </div>`;

    conversationHTML = conversation
      .map(msg => {
        const isCurrentUserSender = msg.senderId == currentUser.id;
        return `
          <div class="${isCurrentUserSender
            ? "bg-blue-500 text-white self-end rounded-[10px_0_10px_10px]"
            : "bg-[#f2f4f8] text-[#373250] self-start rounded-[0_10px_10px_10px]"} p-2 w-fit max-w-[70%] break-words">
            ${msg.content}
          </div>`;
      })
      .join("");

    sendMessageHandler = async (content) => {
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        receiverId: contact.id,
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text",
        seen: false,
      };
      store.setState({ messages: [...store.getState().messages, newMessage] });
      await addMessage(newMessage);
      router("/home");
    };

  } else if (selectedGroup) {
    const group = groups.find(g => g.id == selectedGroup.id);
    const groupMsgs = groupMessages.filter(msg => msg.groupId == group.id);

    markGroupMessagesAsSeen(groupMessages, group.id, currentUser.id);

    headerHTML = `
      <div class="flex items-center gap-2 mb-4">
        <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">${group.avatar || group.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <div class="font-bold">${group.name}</div>
          <span class="text-sm">Membres : ${group.members.length}</span>
        </div>
      </div>`;

    conversationHTML = groupMsgs
      .map(msg => {
        const sender = users.find(u => u.id == msg.senderId);
        const isCurrentUserSender = msg.senderId == currentUser.id;
        return `
          <div class="${isCurrentUserSender
            ? "bg-blue-500 text-white self-end rounded-[10px_0_10px_10px]"
            : "bg-[#f2f4f8] text-[#373250] self-start rounded-[0_10px_10px_10px]"} p-2 w-fit max-w-[70%] break-words">
            ${!isCurrentUserSender ? `<div class="text-xs font-semibold text-gray-500 mb-1">${sender?.prenom || "Inconnu"}</div>` : ""}
            ${msg.content}
          </div>`;
      })
      .join("");

    sendMessageHandler = async (content) => {
      const newGroupMsg = {
        id: Date.now().toString(),
        groupId: group.id,
        senderId: currentUser.id,
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text",
        seenBy: [currentUser.id],
      };
      store.setState({ groupMessages: [...store.getState().groupMessages, newGroupMsg] });
      await addGroupMessage(newGroupMsg);
      // router("/home");
      const chat = document.querySelector('#chat');
      chat.replaceWith(renderChat())

      const g = document.querySelector('#groups');
      g.replaceWith(renderMessagesGroups(g))
    };
  }

  // === Rendu global ===
  chat.innerHTML = `
    <div class="text-gray-500 flex items-center justify-end gap-5 mb-5 sticky top-0 bg-white z-10 py-2">
      <i class="fa-solid fa-bell"></i>
      <div class="w-10 h-10 bg-blue-500 text-white flex font-bold items-center justify-center rounded-full">${currentUser.avatar}</div>
    </div>

    <div class="h-[1px] w-full bg-gray-100"></div>

    <div class="flex-1 overflow-hidden mt-4 px-2">
      <div class="bg-white rounded-xl w-full p-4 flex flex-col h-full">
        ${headerHTML}
        <div class="h-[1px] w-full bg-gray-100 my-4"></div>
        <div class="flex-1 flex flex-col gap-4 overflow-y-auto pr-2" id="messagesContainer">
          ${conversationHTML}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 mt-2 p-2">
      <input type="text" id="messageInput" placeholder="Écris ton message..." class="flex-1 p-2 rounded-2xl border border-gray-300 outline-none bg-white" />
      <button id="sendButton" class="bg-blue-500 text-white px-5 py-2 rounded-2xl hover:bg-blue-600">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  `;

  const sendButton = chat.querySelector("#sendButton");
  const messageInput = chat.querySelector("#messageInput");

  sendButton.addEventListener("click", () => {
    const content = messageInput.value.trim();
    if (content) {
      sendMessageHandler(content); 
      messageInput.value = "";
    }
  });

  return chat;
}
