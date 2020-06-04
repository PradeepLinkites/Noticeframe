import { connect } from 'react-redux';

// Actions
import { loginUser, resetPhase } from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  loginUserPhase: state.user.loginUserPhase,
  loginUserMessage: state.user.loginUserMessage,
  loginUserData: state.user.loginUserData,

});

// Any actions to map to the component?
const mapDispatchToProps = {
  loginUser: loginUser,
  resetPhase: resetPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
