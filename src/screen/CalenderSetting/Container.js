import { connect } from 'react-redux';
// Actions
import { getSetting , updateSetting, resetEventPhase } from '@redux/event/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getSettingPhase: state.event.getSettingPhase,
  getSettingData: state.event.getSettingData,
  updateSettingPhase: state.event.updateSettingPhase
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getSetting: getSetting,
  updateSetting: updateSetting,
  resetEventPhase: resetEventPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
