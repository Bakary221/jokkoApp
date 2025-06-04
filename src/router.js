import { renderLogin } from "./views/loginView";
import { renderHomePage } from "./views/homePage";

const routes = {
  '/login': renderLogin,
  '/home': renderHomePage,
};



export function router(path = '/login') {
  const view = routes[path] || NotFoundView;

  const app = document.getElementById('app');
  app.innerHTML = ''; 
  app.appendChild(view());
}


