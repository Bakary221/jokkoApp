// services/apiService.js

// const address = "https://json-backend-p9tf.onrender.com/";
const address = "http://localhost:3001/"

export async function fetchOnly(elements) {
  const response = await fetch(address + elements);
  return await response.json();
}

export async function addUser(user) {
  const response = await fetch(address + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}

export async function updateUser(id, updatedData) {
  const response = await fetch(address + `users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(address + `users/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}


export async function addMessage(message) {
  const response = await fetch(address + "messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return await response.json();
}


export async function updateMessage(id, updatedData) {
  const response = await fetch(address + `messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
}



export async function addGroupMessage(message) {
//   try {
//     const groupMessages = JSON.parse(localStorage.getItem("groupMessages")) || [];
//     groupMessages.push(message);
//     localStorage.setItem("groupMessages", JSON.stringify(groupMessages));
//   } catch (error) {
//     console.error("Erreur lors de l'ajout du message de groupe :", error);
//   }

    const response = await fetch(address + "groupMessages" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    });

    return await response.json();
}

