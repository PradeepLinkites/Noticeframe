import hostname  from '../../config'
import Config from "react-native-config"
const HOSTNAME = Config.API_URL

  export function getSetting(userId) {
    return dispatch => { fetch(HOSTNAME +`/get/setting/?data=${userId}`, {
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

  export function updateSetting(data){
    return dispatch => { fetch(HOSTNAME + `/put/setting`, {
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
          type: 'UPDATE_SETTING',
          data
        });
      })
      .catch((error) => {
        throw error
      })
    }
  }

  export function resetSettingPhase() {
    return {
      type: "RESET_SETTING_PHASE"
    }
  }
