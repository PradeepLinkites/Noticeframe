import { connect } from 'react-redux';

// Actions
import { eventDetails , resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventDetailPhase: state.event.getEventDetailPhase,
  getEventDetailData: state.event.getEventDetailData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  eventDetails: eventDetails,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
