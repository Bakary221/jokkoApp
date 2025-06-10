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
    const contact = users.find(u => Number(u.id) === contactId && !u.archive); // <- 🔥 Ne prendre que les non archivés
    if (!contact) return null;

    const convMessages = messages.filter(m =>
      (Number(m.senderId) === currentUserId && Number(m.receiverId) === contactId) ||
      (Number(m.senderId) === contactId && Number(m.receiverId) === currentUserId)
    );

    const lastMessage = convMessages[convMessages.length - 1] || null;

    const unreadCount = convMessages.filter(m =>
      Number(m.senderId) === contactId &&
      Number(m.receiverId) === currentUserId &&
      !m.seen
    ).length;

    return {
      user: contact,
      lastMessage: lastMessage?.content || '',
      lastTime: lastMessage?.timestamp || '',
      unreadCount
    };
  });

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
      .filter(msg => msg.groupId === group.id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const lastMessage = messages[0] || null;
    const sender = lastMessage ? users.find(u => u.id === lastMessage.senderId) : null;

    // ❗ Messages non lus par currentUser : msg.seen == false ET currentUserId pas dans seenBy
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
  
  const currentUserObj = users.find(user => user.id === currentUserId);
  
  if (!currentUserObj) return { users: [], groups: [] };

  const contactUsers = users.filter(user => 
    currentUserObj.contacts.includes(user.id) && user.id !== currentUserId
  );
  
  const userGroups = groups.filter(group => 
    group.members.includes(currentUserId) && !group.archive
  );

  return { users: contactUsers, groups: userGroups };
}



export function getArchivedUsersAndGroups(state) {
  const { currentUser, users, groups } = state;

  if (!currentUser) return { users: [], groups: [] };

  const currentUserId = Number(currentUser.id);
  
  const currentUserObj = users.find(user => user.id === currentUserId);
  
  if (!currentUserObj) return { users: [], groups: [] };

  const archivedContactUsers = users.filter(user => 
    user.archive === true && 
    currentUserObj.contacts.includes(user.id) && 
    user.id !== currentUserId
  );
  const archivedUserGroups = groups.filter(group => 
    group.archive === true && 
    group.members.includes(currentUserId)
  );

  return { 
    users: archivedContactUsers, 
    groups: archivedUserGroups 
  };
}