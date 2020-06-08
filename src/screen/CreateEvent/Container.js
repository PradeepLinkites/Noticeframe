import { connect } from 'react-redux';

// Actions
import { getUser, resetPhase } from '@redux/user/actions';
import { getSetting, getGroupListForShow, createEvent, resetEventPhase } from '@redux/event/actions';


// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,

  getSetttingPhase: state.event.getSetttingPhase,
  getSettingMessage: state.event.getSettingMessage,
  getSettingData: state.event.getSettingData,
  getGroupListForShowPhase: state.event.getGroupListForShowPhase,
  getGroupListForShowMessgae: state.event.getGroupListForShowMessgae,
  getGroupListForShowData: state.event.getGroupListForShowData,
  createEventPhase: state.event.createEventPhase,
  createEventMessage: state.event.createEventMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUser: getUser,
  resetPhase: resetPhase,

  getSetting: getSetting,
  getGroupListForShow: getGroupListForShow,
  createEvent: createEvent,
  resetEventPhase: resetEventPhase,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
