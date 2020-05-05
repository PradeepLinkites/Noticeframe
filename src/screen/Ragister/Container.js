import { connect } from 'react-redux';

// Actions
import { createUser, getUser, updateUser, resetPhase, socialLogin } from '@redux/user/actions';
import * as CategoryActions from '@redux/category/actions';

// The component we're mapping to
import FormRender from './View';
import { styles } from 'react-native-really-awesome-button/src/styles';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  // singupFbData: state.user.singupFbData,
  // singupGoogleData: state.user.singupGoogleData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
