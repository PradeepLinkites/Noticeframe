
// Set initial state
const initialState = {
  getSettingPhase: false,
  getSettingMessage: '',
  getSettingData: {},
  updateSettingPhase: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {   
    case 'GET_SETTING': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getSettingPhase: input.status,
          getSettingMessage: input.message,
          getSettingData: input.data
        };  
      }
    }

    case 'UPDATE_SETTING': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          updateSettingPhase: input.status,
        };  
      }
    }

    case 'RESET_SETTING_PHASE': {
      return {
        ...state,
        getSettingPhase: false,
        updateSettingPhase: false
      }
    }
    default:
      return state;
  }
}
