import { connect } from 'react-redux';

// Actions
import { getEventSlideShow, resetEventPhase } from '@redux/event/actions';
import { getSetting, resetSettingPhase } from '@redux/setting/actions';


// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getEventSlideShowPhase: state.event.getEventSlideShowPhase,
  getEventSlideShowData: state.event.getEventSlideShowData,
  getSettingPhase: state.setting.getSettingPhase,
  getSettingData: state.setting.getSettingData,
})

// Any actions to map to the component?
const mapDispatchToProps = {
  getEventSlideShow: getEventSlideShow,
  resetEventPhase: resetEventPhase,
  getSetting: getSetting,
  resetSettingPhase: resetSettingPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
