import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

export const styleWelcomeScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    resizeMode: 'contain',
    margin: '2.5%',
    height: '25%',
    width: '30%',
  },

  textAlignCenter: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
  },

  textBigBoldBlack: {
    padding: '2.5%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textBigBoldWhite: {
    fontSize: rf(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  textNormalGray: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  buttonBlue: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowBlue: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
});
