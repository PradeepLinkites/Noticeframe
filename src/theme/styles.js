import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';
import { Dimensions, Platform } from 'react-native';

export default {

  container: {
    flex: 1,
  },

  navTitle: {
    fontSize: Sizes.verticalScale(22),
    fontFamily: Fonts.NBlack,
    color: '#000',
    alignSelf: 'center',
    letterSpacing: 0.5,
    marginTop: 5
  },

  navTitleForgot: {
    fontSize: Sizes.verticalScale(18),
    fontFamily: Fonts.NBlack,
    color: '#000',
    alignSelf: 'center',
    letterSpacing: 0.5,
    marginTop: 5
  },

  authContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30
  },

  textBoxView: {
    height: Sizes.verticalScale(75)
  },

  textInputBox: {
    height: Sizes.verticalScale(32),
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    fontFamily: Fonts.NRegular,
    fontSize: Sizes.verticalScale(12),
    color: '#000',
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // shadowOffset: { height: 3, width: 0 },
    // elevation: 1,
    // shadowColor: '#455B6314'
  },

  authDetails: {
    color: Colors.app.textLabel,
    fontSize: Sizes.verticalScale(14),
    textAlign: 'center',
    marginVertical: 20
  },

  authLabel: {
    color: Colors.app.textLabel,
    fontSize: Sizes.verticalScale(12),
    marginLeft: 5,
    marginBottom: 2
  },

  error: {
    color: 'red',
    fontSize: Sizes.verticalScale(10),
    marginLeft: 5,
    marginTop: 2,
    fontFamily: Fonts.NRegular
  }

};
