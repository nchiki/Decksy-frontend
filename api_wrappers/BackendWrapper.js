const API = "https://rolodex.tk/api"
const apiRequests = {
  getUserCard: function (userID) {
  return fetch(`${API}/businesscards/getusercard/card`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
},

getUserHash: function(userID) {
  return fetch(`${API}/businesscards/getusercard/hash`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
},


setUserCard: function(userID, templateID, color) {
  fetch(`${API}/businesscards/setusercard`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
        cardTemplate: {templateID},
        color:{color}
      }),
      cache: 'default',
    })
},

getUserContacts: function(userID) {
  return fetch(`${API}/user/contacts`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
},

getUserDetails: function(userID) {
  return fetch(`${API}/user/details`, {
      method: 'GET',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
},

setUserDetails: function(userID, firstname, lastname, phonenumber, email, company, profession) {
  return fetch(`${API}/user/setdetails`, {
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
},

}
export default apiRequests;
