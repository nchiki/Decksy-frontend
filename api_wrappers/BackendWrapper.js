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
        user: userID,
      }),
      cache: 'default',
    })
    .then(function(response){
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your getUserCard fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
},

setUserCard: function(userID, templateID, color) {

  fetch(`${API}/businesscards/setusercard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userID,
        cardTemplate: templateID,
        colour:color
      }),

    }).catch(function(error) {
      console.log('There has been a problem with your setUserCard fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });

},

getUserContacts: function(userID) {
  return fetch(`${API}/user/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userID,
      }),
      cache: 'default',
    })
    .then((response) => response.json()).catch(function(error) {
      console.log('There has been a problem with your getUserContacts fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
},

getUserDetails: function(userID) {
  return fetch(`${API}/user/details`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userID,
      }),
      cache: 'default',
    })
    .then(function(response){
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your getUserDetails fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
},

setUserDetails: function(userID, firstname, lastname, phonenumber, email, company, profession, cardID) {
  return fetch(`${API}/user/setdetails`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userID,
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
        email: email,
        company: company,
        profession: profession,
        card: cardID
      }),
      cache: 'default',
    }).
    catch(function(error) {
      console.log('There has been a problem with your setUserDetails fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
  },

  setCard: function(userID, cardID) {
    return fetch(`${API}/user/setdetails`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userID,
          card: cardID
        }),
        cache: 'default',
      }).
      catch(function(error) {
        console.log('There has been a problem with your setCard fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
    },
  addCard : function(cardOwner, addTo) {
    return fetch(`${API}/user/addcard`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardOwner: cardOwner,
        addTo: addTo,
      }),
      cache: 'default',
    })
    .catch(function(error) {
      console.log('There has been a problem with your setUserDetails fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
    });
  },
  
  getID: function() {
    return fetch(`${API}/user/makeid`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
      }),
      cache: 'default',
    })
    .then(function(response){
      return response.json();
    })
    .catch(function(error) {
    console.log('There has been a problem with your getID fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
},

  setNote: function(userID, contactID, note) {
    return fetch(`${API}/user/setnote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userID,
        contact: contactID,
        note: note,
      }),
      cache: 'default',
    })
    .catch(function(error) {
      console.log('There has been a problem with your setNote fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
    });
    },

    getNote: function(userID, contactID) {
      return fetch(`${API}/user/getnote`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userID, 
          contact: contactID,
        }),
      cache: 'default',
      })
      .then(function(response){
        return response.json();
      })
      .catch(function(error) {
      console.log('There has been a problem with your getID fetch operation: ' + error.message);
      // ADD THIS THROW error
        throw error;
      });
},


}



export default apiRequests;
