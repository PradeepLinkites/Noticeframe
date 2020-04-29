import { Platform } from 'react-native';
import AppSizes from './sizes';

function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const base = {
  size: 16,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'Lato',
    },
    android: {
      family: 'Lato',
    },
  }),
};

export default {

  // NunitoSans Fonts
  NRegular: 'NunitoSans-Regular',
  NBlack: 'NunitoSans-Black'
};
