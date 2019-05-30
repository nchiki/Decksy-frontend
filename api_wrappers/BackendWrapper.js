const API = "https://rolodex.tk/"

function getUserCard(userID) {
  return fetch(`${API}/businesscards/getusercard/card`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function getUserHash(userID) {
  return fetch(`${API}/businesscards/getusercard/hash`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function setUserCard(userID, templateID, color) {
  fetch(`${API}/businesscards/setusercard`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
        cardTemplate: {templateID},
        color:{color}
      }),
    })
    
}

function getUserContacts(userID) {
  return fetch(`${API}/user/contacts`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function getUserDetails(userID) {
  return fetch(`${API}/user/details`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function addUserToContacts(userID, code) {

}
