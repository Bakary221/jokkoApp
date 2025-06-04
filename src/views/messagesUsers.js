export function renderMessagesUsers(conteneur){

    const messageList = document.createElement('ul');
    messageList.className = 'flex flex-col gap-2 overflow-y-auto';
    messageList.setAttribute('id','users');

    messageList.innerHTML = `      
          <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
            <div class="flex items-center gap-2">
              <div class="relative">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">BD</div>
                <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
              </div>
              <div>
                <div class="font-bold">Bakary Diassy</div>
                <small>Bonjour Anna comment cava ?</small>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="text-sm">10:23</span>
              <span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">2</span>
            </div>
          </li>
          <li class="flex items-center justify-between py-4 px-2 border-b-2 hover:bg-white cursor-pointer hover:shadow">
            <div class="flex items-center gap-2">
              <div class="relative">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">BD</div>
                <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
              </div>
              <div>
                <div class="font-bold">Bakary Diassy</div>
                <small>Bonjour Anna comment cava ?</small>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="text-sm">10:23</span>
              <span class="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">2</span>
            </div>
          </li>`;
        conteneur.innerHTML = '';
        conteneur.appendChild(messageList);
        return messageList;
}