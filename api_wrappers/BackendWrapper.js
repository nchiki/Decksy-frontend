const API = "https://rolodex.tk/"

function getUserCard(userID) {
  return fetch(`${API}/businesscards/getusercard/`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function getUserHash(userID) {
  return fetch(`${API}/businesscards/getusercard/hash`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function getUserContacts(userID) {
  return fetch(`${API}/user/contacts`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function getUserDetails(userID) {
  return fetch(`${API}/user/details`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}

function setUserDetails(userID, firstname, lastname, phonenumber, email, company, profession) {
  return fetch(`${API}/user/details`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
        firstName: {firstname},
        lastName: {lastname},
        phoneNumber: {phonenumber},
        email:{email},
        company: {company},
        profession: {profession}
      
      }),
      cache: 'default',
    })
    .then((response) => response.json());
}