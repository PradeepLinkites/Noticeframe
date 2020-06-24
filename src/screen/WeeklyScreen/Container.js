import { connect } from 'react-redux';

// Actions
import { getEventCalender, resetEventPhase } from '@redux/event/actions';
import { getSetting, resetSettingPhase } from '@redux/setting/actions';


// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getSettingPhase: state.setting.getSettingPhase,
  getSettingMessage: state.setting.getSettingMessage,
  getSettingData: state.setting.getSettingData,

  getEventCalenderPhase: state.event.getEventCalenderPhase,
  getEventCalenderData: state.event.getEventCalenderData,
})

// Any actions to map to the component?
const mapDispatchToProps = {
  getSetting: getSetting,
  resetSettingPhase: resetSettingPhase,

  getEventCalender: getEventCalender,
  resetEventPhase: resetEventPhase
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
