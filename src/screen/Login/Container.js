import { connect } from 'react-redux';

// Actions
import { loginUser, getUser, resetPhase, resetOnError, socialLogin } from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  // loginData : state.user.loginData,
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
  loginUserPhase: state.user.loginUserPhase,
  loginUserMessage: state.user.loginUserMessage,
  loginUserData: state.user.loginUserData,
  socialLoginPhase: state.user.socialLoginPhase,
  socialLoginMessage: state.user.socialLoginMessage,
  socialLoginData: state.user.socialLoginData
});

// Any actions to map to the component?
const mapDispatchToProps = {
  loginUser: loginUser,
  getUser: getUser,
  resetPhase: resetPhase,
  resetOnError: resetOnError,
  socialLogin: socialLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
