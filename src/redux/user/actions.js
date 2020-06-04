import { cos } from "react-native-reanimated";
const HOSTNAME = process.env.HOSTNAME

export function createUser(user) {
  return dispatch => { fetch('https://notice-frame-backend.herokuapp.com/api/sign-up', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
         return dispatch({
            type: 'SIGNUP',
            data
          });
        })
        .catch((error) => {
            throw error
        })
    }
  }
 
  export function loginUser(user) {
    return dispatch => { fetch('https://notice-frame-backend.herokuapp.com/api/login', {
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
           return dispatch({
              type: 'LOGIN',
              data
            });
          })
          .catch((error) => {
              throw error
          })
      }
  }

  export function forgotPassword(email) {
    return dispatch => { fetch('https://notice-frame-backend.herokuapp.com/api/post/sendLink/ForUpdatePassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data=>',data)
          return dispatch({
            type: 'FORGET_PASSWORD',
            data
          });
        })
        .catch((error) => {
            throw error
        })
    }
  }

  // export function getUser(userId) {
  //   return dispatch => {fetch(`http://169.56.143.172:5001/api/v1/accounts/detail/${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         }
  //       })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //          return dispatch({
  //             type: 'GET_USER',
  //             data
  //           });
  //         })
  //         .catch((error) => {
  //             throw error
  //         })
  //     }
  //   }

  // export function updateUser(user) {
  //   return dispatch => { fetch('http://169.56.143.172:5001/api/v1/accounts/edit', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(user)
  //       })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //           return dispatch({
  //             type: 'UPDATE_USER',
  //             data
  //           });
  //         })
  //         .catch((error) => {
  //             throw error
  //         })
  //     }
  // }

  // export function cancelSubscription(userId) {
  //   return dispatch => { fetch('http://169.56.143.172:5001/api/v1/accounts/cancel_subscription', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({userId})
  //       })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         return dispatch({
  //             type: 'CANCEL_SUBSCRIPTION',
  //             data
  //           });
  //         })
  //         .catch((error) => {
  //             throw error
  //         })
  //     }
  // }

  // export function socialLogin(user) {
  //   return dispatch => { fetch("http://169.56.143.172:5001/api/v1/accounts/login/social", {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(user)
  //       })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //          return dispatch({
  //             type: 'SOCIAL_LOGIN',
  //             data
  //           });
  //         })
  //         .catch((error) => {
  //             throw error
  //         })
  //     }
  //   }

  // export function logOut() {
  //   return {
  //     type: "RESET"
  //   }
  // }

  // export function resetUser() {
  //   return {
  //     type: "RESET"
  //   }
  // }

  // export function resetPhase() {
  //   return {
  //     type: "RESET_PHASE"
  //   }
  // }

  // export function resetOnError() {
  //   return {
  //     type: "RESET_ERROR_DATA"
  //   }
  // }