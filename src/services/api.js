// services/apiService.js

const address = "http://localhost:3001/";

// GET : récupérer une ressource
export async function fetchOnly(elements) {
  const response = await fetch(address + elements);
  return await response.json();
}

// POST : ajouter une ressource
export async function addUser(user) {
  const response = await fetch(address + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json(); // retourne l'objet créé avec son id
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
