import { router } from './router.js';
import { fetchOnly } from './services/api.js';
import { store } from './store/store.js';



document.addEventListener('DOMContentLoaded', async () => {
  const users = await fetchOnly("users");
  const messages = await fetchOnly("messages");
  const groups = await fetchOnly("groups");
  const groupMessages = await fetchOnly("groupMessages");

  store.setState({ users: users, messages: messages  , groups: groups  , groupMessages: groupMessages});

  const userId = localStorage.getItem('user_id');
  if (userId) {
    const user = users.find(u => u.id == userId);
    if (user) {
      store.setState({ currentUser: user });
      router('/home');
            
      return;
    }
  }

  router('/login');
});
