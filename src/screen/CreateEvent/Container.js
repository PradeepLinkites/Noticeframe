import { connect } from 'react-redux';

// Actions
import { getUser, resetPhase } from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUser: getUser,
  resetPhase: resetPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
