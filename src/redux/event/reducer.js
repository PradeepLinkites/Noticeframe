
// Set initial state
const initialState = {
  getSetttingPhase: false,
  getSettingMessage: '',
  getSettingData: {},
  getGroupListForShowPhase: false,
  getGroupListForShowMessgae: '',
  getGroupListForShowData: {},
  createEventPhase: false,
  createEventMessage: '',
  getEventDetailPhase: false,
  getEventDetailData: {},
  getEventPhase: false,
  getEventData: [],
  getEventCalenderPhase: false,
  getEventCalenderData: [],
  getEventSlideShowPhase: false,
  getEventSlideShowData: [],
  updateEventPhase: false,
  updateEventMessage: '',
  updateEventData: {},
  deleteEventPhase: false,
  deleteEventMessage: '',
  updateSlideShowPhase: false,
  updateSlideShowMessage: '',
  createGroupPhase: false,
  createGroupMessage: '',
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
  
    case 'GET_EVENT': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getEventPhase: input.status,
          getEventData: input.data
        };  
      }
    }
    case 'GET_EVENT_DETAILS': {
      const input = action.data
      return {
        ...state,
        getEventDetailPhase: input.status,
        getEventDetailData: input.data
      };
      return {};
    }

    case 'GET_EVENT_CALENDER': {
      const input = action.data
      return {
        ...state,
        getEventCalenderPhase: input.status,
        getEventCalenderData: input.data
      };
      return {};
    }

    case 'GET_EVENT_SLIDESHOW': {
      const input = action.data
      return {
        ...state,
        getEventSlideShowPhase: input.status,
        getEventSlideShowData: input.data
      };
      return {};
    }

    case 'UPDATE_EVENT': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          updateEventPhase: input.status,
          updateEventMessage: input.message,
          updateEventData: input.data
        };  
      }
    }

    case 'DELETE_EVENT': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          deleteEventPhase: input.status,
          deleteEventMessage: input.message,
        };  
      }
    }

    case 'UPDATE_SLIDESHOW': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          updateSlideShowPhase: input.status,
          updateSlideShowMessage: input.message,
        };  
      }
    }

    case 'CREATE_GROUP': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          createGroupPhase: input.status,
          createGroupMessage: input.message,
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

    case 'RESET_PHASE': {
      return {
        ...state,
        getSettingPhase: false,
        getGroupListForShowPhase: false,
        createEventPhase: false,
        getEventDetailPhase: false,
        getEventPhase: false,
        getEventCalenderPhase: false,
        getEventSlideShowPhase: false,
        updateEventPhase: false,
        deleteEventPhase: false,
        updateSlideShowPhase: false,
        createGroupPhase: false,
        updateSettingPhase: false
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
