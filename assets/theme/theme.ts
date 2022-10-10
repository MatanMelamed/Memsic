import {StyleSheet} from 'react-native';
import {Colors} from '../Colors';

const spacing = {
  small: 8,
  medium: 16,
  large: 32,
  huge: 64,
};

const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
};

const defaultTheme = StyleSheet.create({
  mediumButton: {
    backgroundColor: Colors.Grayish,
    paddingVertical: 8,
    width: 90,
    borderRadius: 10,

    textAlign: 'center',
    fontSize: fontSizes.medium,
    fontWeight: '700',
    color: Colors.White,
  },

  smallLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.Grayish,
  },
  mediumLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Grayish,
  },
  largeLabel: {},

  textInput: {
    paddingLeft: 6,
    paddingVertical: 3,
    fontSize: 16,
    fontWeight: '500',
    width: '85%',
    borderBottomWidth: 1,
  },
});

export {defaultTheme as theme, spacing, fontSizes};
