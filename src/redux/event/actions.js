import hostname  from '../../config'
import { cos } from 'react-native-reanimated';
import Config from "react-native-config"
const HOSTNAME = Config.API_URL

  export function getGroupListForShow(userId) {
    return dispatch => { fetch(HOSTNAME + `/get/groupListForShow/?id=${userId}`, {
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
    return dispatch => { fetch(HOSTNAME + `/post/event`, {
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
    return dispatch => { fetch(HOSTNAME + `/get/eventsById?data=${userId}`, {
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
  return dispatch => { fetch(HOSTNAME + `/get/eventDetails?data=${userId}`, {
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
    return dispatch => { fetch(HOSTNAME + `/get/event/forCalendars?data=${userId}`, {
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
    return dispatch => { fetch(HOSTNAME + `/get/event/slideShow?data=${userId}`, {
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
    return dispatch => { fetch(HOSTNAME  + `/put/event`, {
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
    return dispatch => { fetch(HOSTNAME + `/delete/event?data=${eventId}`, {
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
    return dispatch => { fetch(HOSTNAME + `/put/event/slideShow`, {
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
    return dispatch => { fetch(HOSTNAME + `/post/createGroup`, {
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

  export function resetEventPhase() {
    return {
      type: "RESET_PHASE"
    }
  }