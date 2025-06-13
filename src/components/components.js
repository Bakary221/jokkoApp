import { itemsSideBar } from "../const";


export function renderView(index , conteneur){
    const name = itemsSideBar[index];
    name(conteneur);
}



export function getContactsWithMessages(state) {
  const { currentUser, users, messages } = state;
  if (!currentUser) return [];

  const currentUserId = Number(currentUser.id);
  const contactIds = new Set();

  // Identifier tous les contacts avec lesquels currentUser a échangé
  messages.forEach(msg => {
    const senderId = Number(msg.senderId);
    const receiverId = Number(msg.receiverId);

    if (senderId === currentUserId) {
      contactIds.add(receiverId);
    } else if (receiverId === currentUserId) {
      contactIds.add(senderId);
    }
  });

  const contactsWithMessages = [...contactIds].map(contactId => {
    const contact = users.find(u => Number(u.id) === contactId && !u.archive);
    if (!contact) return null;

    // Filtrer tous les messages entre currentUser et ce contact
    const convMessages = messages.filter(msg =>
      (Number(msg.senderId) === currentUserId && Number(msg.receiverId) === contactId) ||
      (Number(msg.senderId) === contactId && Number(msg.receiverId) === currentUserId)
    );

    const lastMessage = convMessages[convMessages.length - 1] || null;

    // Compter uniquement les messages non vus reçus par le currentUser
    const unreadCount = convMessages.filter(msg =>
      Number(msg.receiverId) === currentUserId &&
      Number(msg.senderId) === contactId &&
      !msg.seen
    ).length;

    return {
      user: contact,
      lastMessage: lastMessage?.content || '',
      lastTime: lastMessage?.timestamp || '',
      unreadCount,
    };
  });

  // Supprimer les résultats nulls (ex : utilisateurs archivés)
  return contactsWithMessages.filter(Boolean);
}


export function getGroupsWithMessages(state) {
  const { currentUser, groups, groupMessages, users } = state;

  if (!currentUser) {
    console.log("Aucun utilisateur connecté");
    return { groupsWithMessages: [], totalUnreadMessages: 0 };
  }

  const currentUserId = Number(currentUser.id);

  const userGroups = groups.filter(group =>
    group.members.map(Number).includes(currentUserId) && !group.archive
  );

  let totalUnread = 0;

  const result = userGroups.map(group => {
    const messages = groupMessages
      .filter(msg => Number(msg.groupId) === Number(group.id))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const lastMessage = messages[messages.length - 1] || null;
    const sender = lastMessage ? users.find(u => Number(u.id) === Number(lastMessage.senderId)) : null;

    const unreadMessages = messages.filter(msg =>
      msg.seen === false && !msg.seenBy.includes(currentUserId)
    );

    const unreadCount = unreadMessages.length;
    totalUnread += unreadCount;

    return {
      group,
      lastMessage: lastMessage?.content || '',
      lastTime: lastMessage?.timestamp || '',
      senderName: sender ? sender.prenom : '',
      unreadCount
    };
  });

  return {
    groupsWithMessages: result,
    totalUnreadMessages: totalUnread
  };
}




export function getUsersAndGroups(state) {
  const { currentUser, users, groups } = state;

  if (!currentUser) return { users: [], groups: [] };

  const currentUserId = Number(currentUser.id); 

  const currentUserObj = users.find(user => Number(user.id) === currentUserId);

  if (!currentUserObj) return { users: [], groups: [] };

  const contactIds = currentUserObj.contacts.map(id => Number(id));

  const contactUsers = users.filter(user => 
    contactIds.includes(Number(user.id)) && Number(user.id) !== currentUserId
  );

  const userGroups = groups.filter(group => 
    group.members.map(id => Number(id)).includes(currentUserId) && !group.archive
  );

  return { users: contactUsers, groups: userGroups };
}




export function getArchivedUsersAndGroups(state) {
  const { currentUser, users, groups } = state;

  if (!currentUser) return { users: [], groups: [] };

  const currentUserId = Number(currentUser.id);

  const currentUserObj = users.find(user => Number(user.id) === currentUserId);
  if (!currentUserObj) return { users: [], groups: [] };

  const archivedContactUsers = users.filter(user => 
    user.archive === true &&
    currentUserId !== Number(user.id) &&
    currentUserObj.contacts.includes(Number(user.id))
  );

  const archivedUserGroups = groups.filter(group => 
    group.archive === true &&
    group.members.map(Number).includes(currentUserId)
  );

  return {
    users: archivedContactUsers,
    groups: archivedUserGroups
  };
}
