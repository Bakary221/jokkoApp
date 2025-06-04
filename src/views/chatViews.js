
export function renderChat(){

    const chat = document.createElement('section');
    chat.className = 'flex-1 p-5 flex flex-col h-full';

    chat.innerHTML = ` 
        <div class="text-gray-500 flex items-center justify-end gap-5 mb-5">
            <i class="fa-solid fa-bell"></i>
            <div class="w-10 h-10 bg-blue-500 text-white flex font-bold items-center justify-center rounded-full">BD</div>
        </div>

        <div class="h-[1px] w-full bg-gray-100"></div>

        <!-- Corps du chat avec scroll -->
        <div class="flex-1 overflow-hidden mt-4 px-2">
          <div class="bg-white rounded-xl w-full p-4 flex flex-col h-full">
            
            <!-- Header -->
            <div class="flex items-center gap-2 mb-4">
              <div class="relative">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">BD</div>
                <div class="w-3 h-3 bg-green-500 rounded-full absolute right-1 top-8"></div>
              </div>
              <div>
                <div class="font-bold">Thierno Segnane</div>
                <span class="text-sm">en ligne</span>
              </div>
            </div>

            <div class="h-[1px] w-full bg-gray-100 my-4"></div>

            <!-- Scrollable messages container -->
            <div class="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">

              <!-- Tes messages ici -->
              <div class="bg-[#f2f4f8] p-2 w-fit max-w-[70%] text-[#373250] rounded-[0_10px_10px_10px] self-start break-words">
                Bonjour Bakary ?
              </div>
              <div class="bg-blue-500 text-white p-2 w-fit max-w-[70%] rounded-[10px_0_10px_10px] self-end break-words">
                Salut Bro je vais bien et toi ?
              </div>
              <div class="bg-[#f2f4f8] p-2 w-fit max-w-[60%] text-[#373250] rounded-[0_10px_10px_10px] self-start break-words">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </div>
              <!-- Ajoute autant de messages que tu veux ici -->

            </div>
          </div>
        </div>

        <!-- Zone d'envoi de message -->
        <div class="flex items-center gap-2 mt-2 p-2">
            <input type="text" placeholder="Écris ton message..." class="flex-1 p-2 rounded-2xl border border-gray-300 outline-none bg-white" />
            <button class="bg-blue-500 text-white px-5 py-2 rounded-2xl hover:bg-blue-600">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>`;

        return chat;
}