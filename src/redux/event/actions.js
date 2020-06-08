

  export function getSetting(userId) {
    return dispatch => { fetch(`https://notice-frame-backend.herokuapp.com/api/get/setting/?data=${userId}`, {
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
            type: 'GET_SETTING',
            data
          });
        })
        .catch((error) => {
            throw error
        })
    }
  }

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

  export function resetEventPhase() {
    return {
      type: "RESET_PHASE"
    }
  }

// export function categoryList (){
//   return dispatch => { fetch("http://169.56.143.172:5001/api/v1/categories/get/published", {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//       return dispatch({
//         type: 'CATEGORY',
//         data
//       });
//     })
//     .catch((error) => {
//         throw error
//     })
//     }
//   }
 
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

