import { connect } from 'react-redux';

// Actions
import { getUser, updateUser, resetPhase } from '@redux/user/actions';
import * as CategoryActions from '@redux/category/actions';

// The component we're mapping to
import FormRender from './View';
import { styles } from 'react-native-really-awesome-button/src/styles';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  selectCategoryPhase: state.category.selectCategoryPhase,
  selectCategoryData: state.category.selectCategoryData,
  categoryData: state.category.categoryData,
  getUserPhase: state.user.getUserPhase,
  getUserMessage: state.user.getUserMessage,
  getUserData: state.user.getUserData,
  updateUserPhase: state.user.updateUserPhase,
  updateUserMessage: state.user.updateUserMessage,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  selectCategory: CategoryActions.selectCategory,
  getCategoryVideos: CategoryActions.selectCategory,
  getCategory: CategoryActions.categoryList,
  getUser: getUser,
  updateUser: updateUser,
  resetPhase: resetPhase,
  resetVideosPhase: CategoryActions.resetVideosPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);
