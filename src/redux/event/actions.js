
  export function getGroupListForShow(userId) {
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/groupListForShow/?id=${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
          return dispatch({
            type: 'GET_GROUPLISTFORSHOW',
            data
          });
        })
        .catch((error) => {
            throw error
        })
    }
  }
  
  export function createEvent(data){
    return dispatch => { fetch("https://notice-frame-backend.herokuapp.com/api/post/event", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      })
     .then((data) => {
       console.log('create event==>', data)
        return dispatch({
          type: 'CREATE_EVENT',
          data
        });
      })
      .catch((error) => {
        throw error
      })
      }
    }

  export function getEvent(userId){
    console.log('userId', userId)
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/eventsById?data=${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        return dispatch({
          type: 'GET_EVENT',
          data
        });
      })
      .catch((error) => {
          throw error
      })
      }
    }
    
  export function eventDetails(userId){
  return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/eventDetails?data=${userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
      return dispatch({
        type: 'GET_EVENT_DETAILS',
        data
      });
    })
    .catch((error) => {
        throw error
    })
    }
  }

  export function getEventCalender (userId){
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/event/forCalendars?data=${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        return dispatch({
          type: 'GET_EVENT_CALENDER',
          data
        });
      })
      .catch((error) => {
          throw error
      })
      }
    }

  export function getEventSlideShow (userId){
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/event/slideShow?data=${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        return dispatch({
          type: 'GET_EVENT_SLIDESHOW',
          data
        });
      })
      .catch((error) => {
          throw error
      })
      }
    }

  export function updateEvent(data){
    return dispatch => { fetch("https://notice-frame-backend.herokuapp.com/api/put/event", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      })
     .then((data) => {
        return dispatch({
          type: 'UPDATE_EVENT',
          data
        });
      })
      .catch((error) => {
        throw error
      })
      }
    }
 
  export function deleteEvent(eventId){
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/delete/event?data=${eventId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        return dispatch({
          type: 'DELETE_EVENT',
          data
        });
      })
      .catch((error) => {
          throw error
      })
      }
  }

  export function updateSlideShow(data){
    return dispatch => { fetch("https://notice-frame-backend.herokuapp.com/api/put/event/slideShow", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      })
     .then((data) => {
        return dispatch({
          type: 'UPDATE_SLIDESHOW',
          data
        });
      })
      .catch((error) => {
        throw error
      })
    }
  }

  export function createGroup(data){
    return dispatch => { fetch("https://notice-frame-backend.herokuapp.com/api/post/createGroup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json()
      })
     .then((data) => {
        return dispatch({
          type: 'CREATE_GROUP',
          data
        });
      })
      .catch((error) => {
        throw error
      })
    }
  }

  // export function getSetting(userId) {
  //   return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/setting/?data=${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       }
  //     })
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //         return dispatch({
  //           type: 'GET_SETTING',
  //           data
  //         });
  //       })
  //       .catch((error) => {
  //           throw error
  //       })
  //   }
  // }



  // export function updateSetting(data){
  //   return dispatch => { fetch("https://notice-frame-backend.herokuapp.com/api/put/setting", {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //     })
  //     .then((res) => {
  //       return res.json()
  //     })
  //    .then((data) => {
  //       return dispatch({
  //         type: 'UPDATE_SETTING',
  //         data
  //       });
  //     })
  //     .catch((error) => {
  //       throw error
  //     })
  //   }
  // }

  export function resetEventPhase() {
    return {
      type: "RESET_PHASE"
    }
  }

//   export function selectCategory(data){
//     return dispatch => { fetch("http://169.56.143.172:5001/api/v1/videos/get/filter", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//       })
//       .then((res) => {
//         return res.json();
//       })
//      .then((data) => {
//         return dispatch({
//           type: 'SELECT_CATEGORY',
//           data
//         });
//       })
//       .catch((error) => {
//         throw error
//       })
//       }
//     }

//     export function resetVideosPhase() {
//       return {
//         type: "RESET_VIDEO_PHASE"
//       }
//     }

//     // export function updateUser(user) {
//     //   return dispatch => { fetch('http://169.56.143.172:5001/api/v1/accounts/edit', {
//     //         method: 'POST',
//     //         headers: {
//     //           'Accept': 'application/json',
//     //           'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(user)
//     //       })
//     //       .then((res) => {
//     //         return res.json();
//     //       })
//     //       .then((data) => {
//     //          return dispatch({
//     //             type: 'EDIT_USER',
//     //             data
//     //           });
//     //         })
//     //         .catch((error) => {
//     //             throw error
//     //         })
//     //     }
//     // }


//     // export function addCard(user) {
//     //   console.log('add card =>',user)
//     //   return dispatch => { fetch('http://169.56.143.172:5001/api/v1/stripe/add/card', {
//     //         method: 'POST',
//     //         headers: {
//     //           'Accept': 'application/json',
//     //           'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({
//     //           userId : user.userId, 
//     //           card_token : user.id , 
//     //        })
//     //       })
//     //       .then((res) => {
//     //         return res.json();
//     //       })
//     //       .then((data) => {
//     //         console.log('data==>>', data)
//     //          return dispatch({
//     //             type: 'ADD_CARD',
//     //             data
//     //           });
//     //         })
//     //         .catch((error) => {
//     //             throw error
//     //         })
//     //     }
//     // }

