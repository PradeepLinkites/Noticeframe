import { connect } from 'react-redux';

// Actions
import { getEvent , resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventPhase: state.event.getEventPhase,
  getEventData: state.event.getEventData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getEvent: getEvent,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
