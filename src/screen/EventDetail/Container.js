import { connect } from 'react-redux';

// Actions
import { eventDetails , getGroupListForShow, deleteEvent, getEvent, resetEventPhase } from '@redux/event/actions';
import { getSetting, resetSettingPhase } from '@redux/setting/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventDetailPhase: state.event.getEventDetailPhase,
  getEventDetailData: state.event.getEventDetailData,
  deleteEventPhase: state.event.deleteEventPhase,
  deleteEventMessage: state.event.deleteEventMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  eventDetails: eventDetails,
  getGroupListForShow: getGroupListForShow,
  deleteEvent: deleteEvent,
  getEvent: getEvent,
  resetEventPhase: resetEventPhase,

  getSetting: getSetting,
  resetSettingPhase: resetSettingPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
