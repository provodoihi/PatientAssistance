import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
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
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <MapView region={region} style={styles.container2}>
        <Marker
          title={route.params.name}
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};
