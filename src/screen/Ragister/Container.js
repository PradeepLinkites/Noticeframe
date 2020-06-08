import { connect } from 'react-redux';

// Actions
import { createUser, getUser, updateUser, resetPhase, socialLogin } from '@redux/user/actions';
// import * as CategoryActions from '@redux/category/actions';

// The component we're mapping to
import FormRender from './View';
import { styles } from 'react-native-really-awesome-button/src/styles';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  createUserPhase: state.user.createUserPhase,
  createUserMessage: state.user.createUserMessage,
  createUserData: state.user.createUserData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  createUser: createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
