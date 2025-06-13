import { router } from "../router";

export function renderSideBar(){
    const sideBar = document.createElement('section');
    sideBar.className = 'bg-[#6263fb] flex flex-col items-center p-3 text-white justify-start py-5 rounded-[15px] shadow-[0px_4px_26px_-3px_rgba(0,_0,_0,_0.1)]';
    sideBar.setAttribute('id' , 'sideBar');

    sideBar.innerHTML = `
        <h2 class="font-bold mb-5">JokkoApp</h2>
        <div class="flex flex-col items-center gap-5">
          <i class="fa-solid fa-message p-4 rounded-lg hover:bg-blue-300 cursor-pointer bg-blue-300"></i>
          <i class="fa-solid fa-user-group p-4 rounded-lg hover:bg-blue-300 cursor-pointer"></i>
          <i class="fa-solid fa-arrows-turn-to-dots p-4 rounded-lg hover:bg-blue-300 cursor-pointer"></i>
          <i class="fa-solid fa-box-archive p-4 rounded-lg hover:bg-blue-300 cursor-pointer"></i>
          <i class="fa-solid fa-plus p-4 rounded-lg hover:bg-blue-300 cursor-pointer"></i>
        </div>
        <i class="fa-solid fa-right-from-bracket mt-auto border-[1px] border-white p-4 rounded-lg hover:bg-red-500 hover:border-red-500 cursor-pointer" id = "deconnexion"></i>
     `;

      const btnDeconnexion = sideBar.querySelector('#deconnexion');
      btnDeconnexion.addEventListener('click' , ()=>{
        localStorage.removeItem('user_id');
        router('/login');
      })
    
     return sideBar;
}