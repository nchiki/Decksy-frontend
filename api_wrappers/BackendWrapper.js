const API = "https://rolodex.tk/api"
const apiRequests = {
  getUserCard: function (userID) {
  return fetch(`${API}/businesscards/getusercard`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then(function(response){
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
},

/*getUserHash: function(userID) {
  return fetch(`${API}/businesscards/getusercard/hash`, {
      method: 'POST',
      body: JSON.stringify({
        user: {userID},
      }),
      cache: 'default',
    })
    .then((response) => response.json());
},*/


setUserCard: function(userID, templateID, color) {
  
  fetch(`${API}/businesscards/setusercard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {userID},
        cardTemplate: {templateID},
        colour:{color}
      }),
      
    }).catch(function(error) {
      console.log('There has been a problem with your setUserCard fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
    
},

getUserContacts: function(userID) {
  return fetch(`${API}/user/contacts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
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
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
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
