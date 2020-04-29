
// Set initial state
const initialState = {
  apiMessage: {},
  singupData: {},
  // singupFbData: {},
  // singupGoogleData: {},
  loginData: {},
  forgetData: {},
  userData: {},

//New code
  createUserPhase: false,
  createUserMessage: '',
  createUserData: {},
  getUserPhase: false,
  getUserMessage: '',
  getUserData: {},
  updateUserPhase: false,
  updateUserMessage: '',
  loginUserPhase: false,
  loginUserMessage: '',
  loginUserData: {},
  cancelSubscriptionPhase: false,
  cancelSubscriptionMessage: '',
  cancelSubscriptionData: {},
  socialLoginPhase: false,
  socialLoginMessage: '',
  socialLoginData: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case 'SIGNUP': {
      const input = action.data;
      if(input.success){
        return {
          ...state,
          createUserPhase: input.success,
          createUserMessage: input.message,
          createUserData: input.user
        };  
      } else {
        return {
          ...state,
          createUserPhase: input.success,
          createUserMessage: input.message,
          createUserData: {}
        };  
      }
    }

    case 'GET_USER': {
      const input = action.data;
      if(input.success){
        return {
          ...state,
          getUserPhase: input.success,
          getUserMessage: input.message,
          getUserData: input.user
        };  
      }
    }

    case 'UPDATE_USER': {
      const input = action.data;
      return {
        ...state,
        updateUserPhase: input.success,
        updateUserMessage: input.message,
      };
    }

    case 'CANCEL_SUBSCRIPTION': {
      const input = action.data;
      return {
        ...state,
        cancelSubscriptionData: input,
        cancelSubscriptionPhase: input.success,
        cancelSubscriptionMessage: input.message,
      };
    }

    case 'LOGIN': {
      const input = action.data;
      if(input.success){
        return {
          ...state,
          loginUserPhase: input.success,
          loginUserMessage: input.message,
          loginUserData: input.account
        };  
      } else {
        return {
          ...state,
          loginUserPhase: input.success,
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
    case 'SOCIAL_LOGIN': {
      const input = action.data;
      if(input.success){
        return {
          ...state,
          socialLoginPhase: input.success,
          socialLoginMessage: input.message,
          socialLoginData: input.user
        };  
      } else {
        return {
          ...state,
          socialLoginPhase: input.success,
          socialLoginMessage: input.message,
          socialLoginData: {}
        };  
      }
    }
    case 'RESET_PHASE': {
      return {
        ...state,
        createUserPhase: false,
        getUserPhase: false,
        updateUserPhase: false,
        socialLoginPhase: false
      };
    }
    
    case 'RESET_ERROR_DATA': {
      return {
        ...state,
        loginUserData: {
          error: false,
          errorMessage: 'Something Went wrong'
        }
      };
    }
    
    case "RESET":
      return initialState; 

    default:
      return state;
  }
}
