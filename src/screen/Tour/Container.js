import { connect } from 'react-redux';

// Actions
import * as AuthActions from '@redux/user/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  apiMessage: state.user.apiMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  submit: AuthActions.getDeviceID,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
