import React from 'react';
import {StyleSheet, View} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import HeaderBarBack from '../../components/HeaderBarBack';
import MapView, {Marker} from 'react-native-maps';
import {AppNavigationProps} from '../../navigation/Routes';

const MapViewScreen = ({route}: AppNavigationProps<'MapView'>) => {
  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longtitude,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  };

  return (
    <View style={styles.container}>
      <HeaderBarBack text="MapView" />
      <MapView region={region} style={styles.container2}>
        <Marker
          title={route.params.name}
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longtitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
  },

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtTitle: {
    margin: '2%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtModal: {
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtButton: {
    padding: '2.5%',
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtName: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonModal: {
    backgroundColor: '#FFFFFF',
    margin: '3.5%',
    borderRadius: 24,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  buttonWhite: {
    margin: '2.5%',
    width: '75%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },

  button2: {
    margin: '1%',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  shadowGray: {
    shadowColor: '#a2a2a2',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  img: {
    width: '35%',
    height: '30%',
    resizeMode: 'contain',
  },

  imgModal: {
    width: 128,
    height: 128,
    margin: '5%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '40%',
    height: '70%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default MapViewScreen;
