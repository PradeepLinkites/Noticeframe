import { connect } from 'react-redux';

// Actions
import { createUser, getUser, updateUser, resetPhase, socialLogin } from '@redux/user/actions';
import * as CategoryActions from '@redux/category/actions';

// The component we're mapping to
import FormRender from './ViewSignUp';
import { styles } from 'react-native-really-awesome-button/src/styles';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  apiMessage: state.user.apiMessage,
  singupData: state.user.singupData,
  // singupFbData: state.user.singupFbData,
  // singupGoogleData: state.user.singupGoogleData,
  categoryData: state.category.categoryData,
  selectCategoryData: state.category.selectCategoryData,
  editUserData: state.category.editUserData,
  userData: state.user.userData,
  addCardData: state.category.addCardData,

  //New code
  createUserPhase: state.user.createUserPhase,
  createUserMessage: state.user.createUserMessage,
  createUserData: state.user.createUserData,
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
  updateUserPhase: state.user.updateUserPhase,
  updateUserMessage: state.user.updateUserMessage,
  socialLoginPhase: state.user.socialLoginPhase,
  socialLoginMessage: state.user.socialLoginMessage,
  socialLoginData: state.user.socialLoginData
});

// Any actions to map to the component?
const mapDispatchToProps = {
  // submit: AuthActions.getDeviceID,
  // submitUser: AuthActions.singup,
  getCategory: CategoryActions.categoryList,
  selectCategory: CategoryActions.selectCategory,
  updateUser: CategoryActions.updateUser,
  // logOut: AuthActions.logOut,
  // resetUser: AuthActions.resetUser,
  // addCard: CategoryActions.addCard,
  // submitFbData: AuthActions.singupFb,
  // submitGoogleData: AuthActions.singupGoogle,
  // resetData: AuthActions.resetData,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  resetPhase: resetPhase,
  socialLogin: socialLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
