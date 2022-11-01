import {StyleSheet} from 'react-native';
import {palette, scale} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  srollView: {
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 0.2,
    width: '80%',
    borderRadius: 24,
    alignSelf: 'center',
  },

  textAlignCenter: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
  },

  textNormalGray: {
    padding: '2%',
    fontSize: scale(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  textBigBoldBlack: {
    padding: '2.5%',
    fontSize: scale(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  textBigBoldWhite: {
    fontSize: scale(2.5),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  picker: {
    color: '#9FA5AA',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },

  buttonBlue: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
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
