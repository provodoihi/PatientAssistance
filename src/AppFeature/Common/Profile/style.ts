import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';

export const styleProfileScreen = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 0.93,
    backgroundColor: '#ffffff',
  },

  container2: {
    height: rh(110),
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    width: '35%',
    margin: '1%',
    height: '20%',
    resizeMode: 'contain',
  },

  textAlignCenter: {
    margin: '1.5%',
    textAlign: 'center',
    alignSelf: 'center',
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

  textNormalBlack: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
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
