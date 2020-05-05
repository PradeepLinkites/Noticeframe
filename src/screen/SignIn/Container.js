import { connect } from 'react-redux';
// Actions
// import { loginUser, getUser, resetPhase, resetOnError, socialLogin } from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  // loginData : state.user.loginData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
