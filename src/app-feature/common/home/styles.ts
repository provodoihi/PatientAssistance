import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import {palette} from '../../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  container2: {
    flex: 0.93,
    backgroundColor: palette.white,
  },

  topScreen: {
    backgroundColor: palette.aquaBlue,
    flex: 0.25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  midScreen: {
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
    margin: '1.5%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '30%',
    margin: '1%',
    height: '75%',
    resizeMode: 'contain',
  },

  textAlignCenter: {
    margin: '1.5%',
    textAlign: 'center',
    alignSelf: 'center',
  },

  textAlignLeft: {
    margin: '1.5%',
    marginLeft: '3.5%',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  textBigBoldBlack: {
    padding: '2.5%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: palette.black,
  },

  textBigBoldWhite: {
    fontSize: rf(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: palette.white,
  },

  txtNormalBoldWhite: {
    padding: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: palette.white,
  },

  textNormalPlusBlack: {
    padding: '2%',
    fontSize: rf(2.2),
    fontWeight: 'normal',
    color: palette.black,
  },

  textSmallWhite: {
    fontSize: rf(1.8),
    padding: '2%',
    fontWeight: 'normal',
    color: palette.white,
  },

  buttonNoColor: {
    margin: '3%',
    width: '80%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: palette.white,
  },

  buttonSmall: {
    margin: '1.5%',
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.accent,
  },

  row: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  shadowGray: {
    shadowColor: palette.lightGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  paddingCustom: {
    padding: rf(0.75),
  },
});
