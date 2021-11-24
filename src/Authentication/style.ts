import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

export const authScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '2.5%',
    borderRadius: 24,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonShadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },

  txt: {
    margin: '1%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHeading: {
    padding: '1.5%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtDescription: {
    padding: '1.5%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  txtButton: {
    fontSize: rf(2.5),
    padding: '2%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  picker: {
    color: '#4c4c4c',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
  },

  image: {
    resizeMode: 'contain',
    margin: '2.5%',
    height: '35%',
    width: '35%',
  },
});
