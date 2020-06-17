import { connect } from 'react-redux';

// Actions
import { getUser, resetPhase } from '@redux/user/actions';
import { getSetting, getGroupListForShow, createEvent, getEvent, resetEventPhase } from '@redux/event/actions';


// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,

  getSettingPhase: state.event.getSettingPhase,
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
  getEvent: getEvent,
  getSetting: getSetting,
  getGroupListForShow: getGroupListForShow,
  createEvent: createEvent,
  getEvent: getEvent,
  resetEventPhase: resetEventPhase,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
