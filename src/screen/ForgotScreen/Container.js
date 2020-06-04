import { connect } from 'react-redux';

// Actions
import * as AuthActions from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  forgetData: state.user.forgetData,
  // forgetMessage: state.user.forgetMessage,
  // forgetPhase: state.user.forgetPhase
});

// Any actions to map to the component?
const mapDispatchToProps = {
  forgotPassword: AuthActions.forgotPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
