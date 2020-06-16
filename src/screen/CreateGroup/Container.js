import { connect } from 'react-redux';

// Actions
import { getUser, getUserListForShow, resetPhase } from '@redux/user/actions';
import { createGroup , resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
  getUserListForShowPhase: state.user.getUserListForShowPhase,
  getUserListForShowData: state.user.getUserListForShowData,

  createGroupPhase: state.event.createGroupPhase,
  createGroupMessage: state.event.createGroupMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUser: getUser,
  getUserListForShow: getUserListForShow,
  createGroup: createGroup,
  resetPhase: resetPhase,
  resetEventPhase: resetEventPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
