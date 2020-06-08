
// Set initial state
const initialState = {
  getSetttingPhase: false,
  getSettingMessage: '',
  getSettingData: {},
  getGroupListForShowPhase: false,
  getGroupListForShowMessgae: '',
  getGroupListForShowData: {},
  createEventPhase: false,
  createEventMessage: ''
  // apiMessage: {},
  // categoryData: {},
  // selectCategoryPhase: false,
  // selectCategoryData: {},
  // editUserData: {},
  // addCardData:{}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {   
    case 'GET_SETTING': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getSetttingPhase: input.status,
          getSettingMessage: input.message,
          getSettingData: input.data
        };  
      }
    }

    case 'GET_GROUPLISTFORSHOW': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getGroupListForShowPhase: input.status,
          getGroupListForShowMessgae: input.message,
          getGroupListForShowData: input.data
        };  
      }
    }
    case 'CREATE_EVENT': {
      const input = action.data
      return {
        ...state,
        createEventPhase: input.status,
        createEventMessage: input.message
      };
      return {};
    }
    
    case 'RESET_PHASE': {
      return {
        ...state,
        getSetttingPhase: false,
        getGroupListForShowPhase: false,
        createEventPhase: false,
      }
    }

    // case 'SELECT_CATEGORY': {
    //   const input = action.data;
    //   if(input.success) {
    //     return {
    //       ...state,
    //       selectCategoryPhase: true,
    //       selectCategoryData: input.videos
    //     };
    //   }
    //   // else {
    //   //   return {
    //   //     ...state,
    //   //     selectCategoryPhase: false,
    //   //     selectCategoryData: []
    //   //   };
    //   // }
    // }

    // case 'EDIT_USER': {
    //   const input = action;
    //   return {
    //     ...state,
    //     editUserData: input.data
    //   };
    // }

    // case 'RESET_VIDEO_PHASE': {
    //   return {
    //     ...state,
    //     selectCategoryPhase: false
    //   };
    // }

    default:
      return state;
  }
}
