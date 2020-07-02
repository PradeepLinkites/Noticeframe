import { connect } from 'react-redux';

import { createUser, resetPhase } from '@redux/user/actions';
import FormRender from './View';


// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  createUserPhase: state.user.createUserPhase,
  createUserMessage: state.user.createUserMessage,
  createUserData: state.user.createUserData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  createUser: createUser,
  resetPhase: resetPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
