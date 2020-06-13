import { connect } from 'react-redux';

// Actions
import { getEvent , updateSlideShow, getEventSlideShow, resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventPhase: state.event.getEventPhase,
  getEventData: state.event.getEventData,
  updateSlideShowPhase: state.event.updateSlideShowPhase,
  updateSlideShowMessage: state.event.updateSlideShowMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getEvent: getEvent,
  updateSlideShow: updateSlideShow,
  getEventSlideShow: getEventSlideShow,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
