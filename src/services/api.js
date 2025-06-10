// services/apiService.js

const address = "https://json-backend-p9tf.onrender.com/";

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

// PATCH : modifier une ressource partiellement
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

// DELETE : supprimer une ressource
export async function deleteUser(id) {
  const response = await fetch(address + `users/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
