import { connect } from 'react-redux';

// Actions
import { getSetting , updateSetting, resetSettingPhase } from '@redux/setting/actions';

// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getSettingPhase: state.setting.getSettingPhase,
  getSettingData: state.setting.getSettingData,
  updateSettingPhase: state.setting.updateSettingPhase
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getSetting: getSetting,
  updateSetting: updateSetting,
  resetSettingPhase: resetSettingPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
