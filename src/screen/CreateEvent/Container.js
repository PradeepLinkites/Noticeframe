import { connect } from 'react-redux';

// Actions
import { getUser, resetPhase } from '@redux/user/actions';
import { getGroupListForShow, createEvent, getEvent, resetEventPhase, uploadImage, getEventCalender } from '@redux/event/actions';
import { getSetting , resetSettingPhase} from '@redux/setting/actions';


// The component we're mapping to
import FormRender from './View';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
  getGroupListForShowPhase: state.event.getGroupListForShowPhase,
  getGroupListForShowMessgae: state.event.getGroupListForShowMessgae,
  getGroupListForShowData: state.event.getGroupListForShowData,
  createEventPhase: state.event.createEventPhase,
  createEventMessage: state.event.createEventMessage,
  imageUploadPhase: state.event.imageUploadPhase,
  imageUploadData: state.event.imageUploadData,

  getSettingPhase: state.setting.getSettingPhase,
  getSettingMessage: state.setting.getSettingMessage,
  getSettingData: state.setting.getSettingData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUser: getUser,
  resetPhase: resetPhase,
  getEvent: getEvent,
  getGroupListForShow: getGroupListForShow,
  createEvent: createEvent,
  getEvent: getEvent,
  resetEventPhase: resetEventPhase,
  uploadImage: uploadImage,
  getSetting: getSetting,
  getEventCalender: getEventCalender,
  resetSettingPhase: resetSettingPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
