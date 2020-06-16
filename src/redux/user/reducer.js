
// Set initial state
const initialState = {
  createUserPhase: false,
  createUserMessage: '',
  createUserData: {},
  loginUserPhase: false,
  loginUserMessage: '',
  loginUserData: {},
  forgetData: {},
  getUserPhase: false,
  getUserMessage: '',
  getUserData: {},
  getUserListForShowPhase: false,
  getUserListForShowData: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case 'SIGNUP': {
      const input = action.data;
      if(input.status){
        return {
          ...state,
          createUserPhase: input.status,
          createUserMessage: input.message,
          createUserData: input.data
        };  
      } else {
        return {
          ...state,
          createUserPhase: input.status,
          createUserMessage: input.message,
          createUserData: {}
        };  
      }
    }

    case 'LOGIN': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          loginUserPhase: input.status,
          loginUserMessage: input.message,
          loginUserData: input.data
        };  
      } else {
        return {
          ...state,
          loginUserPhase: input.status,
          loginUserMessage: input.message,
          loginUserData: {}
        };  
      }
    }

    case 'FORGET_PASSWORD': {
      const input = action;
      return {
        ...state,
        forgetData: input.data
      };
    }

    case 'GET_USER': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getUserPhase: input.status,
          getUserMessage: input.message,
          getUserData: input.data
        };  
      }
    }

    case 'GET_USERLISTFORSHOW': {
      const input = action.data
      if(input.status){
        return {
          ...state,
          getUserListForShowPhase: input.status,
          getUserListForShowData: input.data
        };  
      }
    }
    
    case 'RESET_PHASE': {
      return {
        ...state,
        createUserPhase: false,
        loginUserPhase: false,
        getUserPhase: false,
        getUserListForShowPhase: false
      };
    }
    // case 'UPDATE_USER': {
    //   const input = action.data;
    //   return {
    //     ...state,
    //     updateUserPhase: input.success,
    //     updateUserMessage: input.message,
    //   };
    // }

    // case 'CANCEL_SUBSCRIPTION': {
    //   const input = action.data;
    //   return {
    //     ...state,
    //     cancelSubscriptionData: input,
    //     cancelSubscriptionPhase: input.success,
    //     cancelSubscriptionMessage: input.message,
    //   };
    // }

    // case 'SOCIAL_LOGIN': {
    //   const input = action.data;
    //   if(input.success){
    //     return {
    //       ...state,
    //       socialLoginPhase: input.success,
    //       socialLoginMessage: input.message,
    //       socialLoginData: input.user
    //     };  
    //   } else {
    //     return {
    //       ...state,
    //       socialLoginPhase: input.success,
    //       socialLoginMessage: input.message,
    //       socialLoginData: {}
    //     };  
    //   }
    // }
  
    // case 'RESET_ERROR_DATA': {
    //   return {
    //     ...state,
    //     loginUserData: {
    //       error: false,
    //       errorMessage: 'Something Went wrong'
    //     }
    //   };
    // }
    
    case "RESET":
      return initialState; 

    default:
      return state;
  }
}
