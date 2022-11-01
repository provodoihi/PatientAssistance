import {StyleSheet} from 'react-native';
import {scale} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
