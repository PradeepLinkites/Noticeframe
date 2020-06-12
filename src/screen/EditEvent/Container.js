import { connect } from 'react-redux';

// Actions
import { eventDetails , getSetting, getGroupListForShow, updateEvent, resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventDetailPhase: state.event.getEventDetailPhase,
  getEventDetailData: state.event.getEventDetailData,
  getSetttingPhase: state.event.getSetttingPhase,
  getSettingMessage: state.event.getSettingMessage,
  getSettingData: state.event.getSettingData,
  getGroupListForShowPhase: state.event.getGroupListForShowPhase,
  getGroupListForShowMessgae: state.event.getGroupListForShowMessgae,
  getGroupListForShowData: state.event.getGroupListForShowData,
  updateEventPhase: state.event.updateEventPhase,
  updateEventMessage: state.event.updateEventMessage,
  updateEventData: state.event.updateEventData,

});

// Any actions to map to the component?
const mapDispatchToProps = {
  eventDetails: eventDetails,
  getSetting: getSetting,
  getGroupListForShow: getGroupListForShow,
  updateEvent: updateEvent,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
