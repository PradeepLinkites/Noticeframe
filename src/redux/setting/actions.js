import hostname  from '../../config'

  export function getSetting(userId) {
    return dispatch => { fetch(hostname +`/get/setting/?data=${userId}`, {
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
    return dispatch => { fetch(hostname + `/put/setting`, {
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
