import { connect } from 'react-redux';

// Actions
import { eventDetails , getGroupListForShow, updateEvent, resetEventPhase, getEvent, getEventCalender } from '@redux/event/actions';
import { getSetting, resetSettingPhase  } from '@redux/setting/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventDetailPhase: state.event.getEventDetailPhase,
  getEventDetailData: state.event.getEventDetailData,
  getGroupListForShowPhase: state.event.getGroupListForShowPhase,
  getGroupListForShowMessgae: state.event.getGroupListForShowMessgae,
  getGroupListForShowData: state.event.getGroupListForShowData,
  updateEventPhase: state.event.updateEventPhase,
  updateEventMessage: state.event.updateEventMessage,
  updateEventData: state.event.updateEventData,

  getSettingPhase: state.setting.getSettingPhase,
  getSettingMessage: state.setting.getSettingMessage,
  getSettingData: state.setting.getSettingData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  eventDetails: eventDetails,
  getGroupListForShow: getGroupListForShow,
  updateEvent: updateEvent,
  resetEventPhase: resetEventPhase,
  getEvent: getEvent,
  getSetting: getSetting,
  getEventCalender: getEventCalender,
  resetSettingPhase: resetSettingPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
