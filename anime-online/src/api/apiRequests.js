
const API_URL = `http://localhost:3001/api/animes`

export const HTTP_METHODS = {
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
}

export const GET_ANIMES_DATA = async () => {
  const animes = await fetch(API_URL);
  const data = await animes.json();
  return data
}

export const GET_ANIME_DATA_BY_ID = async (animeName) => {
  const anime = await fetch(API_URL + `/${animeName}`);
  const data = await anime.json();
  return data
}

export const SEND_DATA_ANIME_BY_ID = async (animeId, method, body) => {

  let RESULT_URL = 
    animeId === null 
    ? API_URL 
    : API_URL + `/${animeId}`

  const response = await fetch(RESULT_URL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: 
      body !== null 
      ? JSON.stringify(body) 
      : null
  })
  return response.json();
}

export const LOGIN = async (userName) => {
  const response = await fetch(`${API_URL}/users/${userName}`)
  return response.json();
}

export const CREATE_USER = async (usr) => {
  console.log(usr);
  const response = await fetch(`${API_URL}/users`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usr) 
  })
  console.log("--->>>>", response);
  return response.json();
}

export const DELETE_USER = async (usrName) => {

  const response = await fetch(`${API_URL}/users/${usrName}`, {
    method: HTTP_METHODS.DELETE,
    headers: {
      "Content-Type": "application/json",
    }
  })

  return response.json();
}