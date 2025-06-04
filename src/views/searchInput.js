export function renderInputSearchUsers(){

    const messageList = document.createElement('section');
    messageList.className = 'w-[25%] p-5 flex flex-col border-r-2 gap-5 overflow-y-auto';
    messageList.setAttribute('id','messages')

    messageList.innerHTML = `
        <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-600">Messages</h2>
        <i class="fa-solid fa-pen-to-square p-2 bg-white rounded-md text-gray-600 cursor-pointer hover:bg-blue-500 hover:text-white"></i>
        </div>
        <div class="relative">
          <input class="p-1 rounded-2xl border-2 outline-none pl-4 pr-10 w-full bg-[#f8f9fb]" type="text" placeholder="Rechercher un utilisateur... ">
          <i class="fa-solid fa-magnifying-glass absolute top-[10px] right-3 text-gray-600"></i>
        </div>
        <div id = "discussions"></div>
    `;

    return messageList;
}