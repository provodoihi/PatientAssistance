import React from 'react';
import {View} from 'react-native';
import {HeaderBar} from '../../../components';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {AppNavigationProps} from '../../../navigation/routes';
import {styles} from './styles';

export const MapViewScreen = ({route}: AppNavigationProps<'MapView'>) => {
  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="MapView" isBack={true} />
      <MapView
        provider={PROVIDER_GOOGLE}
        region={region}
        style={styles.container2}>
        <Marker
          title={route.params.name}
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
        />
      </MapView>
    </View>
  );
};
