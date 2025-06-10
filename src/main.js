import { router } from './router.js';
import { fetchOnly } from './services/api.js';
import { store } from './store/store.js';



document.addEventListener('DOMContentLoaded', () => {
  router('/home');
});
