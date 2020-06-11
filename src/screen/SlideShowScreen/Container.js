import { connect } from 'react-redux';

// Actions
import { getEventSlideShow, resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventSlideShowPhase: state.event.getEventSlideShowPhase,
  getEventSlideShowData: state.event.getEventSlideShowData,
})

// Any actions to map to the component?
const mapDispatchToProps = {
  getEventSlideShow: getEventSlideShow,
  resetEventPhase: resetEventPhase,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
