import { connect } from 'react-redux';

// Actions
import { eventDetails , getSetting, getGroupListForShow, deleteEvent, getEvent, resetEventPhase } from '@redux/event/actions';

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
  getSetting: getSetting,
  getGroupListForShow: getGroupListForShow,
  deleteEvent: deleteEvent,
  getEvent: getEvent,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
