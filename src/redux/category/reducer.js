
// Set initial state
const initialState = {
  apiMessage: {},
  categoryData: {},
  selectCategoryPhase: false,
  selectCategoryData: {},
  editUserData: {},
  addCardData:{}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {   
    case 'CATEGORY': {
      const input = action;
      return {
        ...state,
        categoryData: input.data
      };
      return {};
    }
    
    case 'SELECT_CATEGORY': {
      const input = action.data;
      if(input.success) {
        return {
          ...state,
          selectCategoryPhase: true,
          selectCategoryData: input.videos
        };
      }
      // else {
      //   return {
      //     ...state,
      //     selectCategoryPhase: false,
      //     selectCategoryData: []
      //   };
      // }
    }

    case 'EDIT_USER': {
      const input = action;
      return {
        ...state,
        editUserData: input.data
      };
    }

    case 'RESET_VIDEO_PHASE': {
      return {
        ...state,
        selectCategoryPhase: false
      };
    }

    default:
      return state;
  }
}
