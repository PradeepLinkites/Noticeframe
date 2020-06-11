import { connect } from 'react-redux';

// Actions
import { getEventCalender, resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventCalenderPhase: state.event.getEventCalenderPhase,
  getEventCalenderData: state.event.getEventCalenderData,
})

// Any actions to map to the component?
const mapDispatchToProps = {
  getEventCalender: getEventCalender,
  resetEventPhase: resetEventPhase
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
