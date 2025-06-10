import { renderLogin } from "./views/loginView";
import { renderHomePage } from "./views/homePage";
import { store } from "./store/store";
import { renderSignup } from "./views/signupPage";


const routes = {
  '/login': renderLogin,
  '/home': renderHomePage,
  '/signup': renderSignup
};



export function router(path = '/login') {
  const view = routes[path] || NotFoundView;

  const app = document.getElementById('app');
  app.innerHTML = ''; 
  app.appendChild(view(store));
}



