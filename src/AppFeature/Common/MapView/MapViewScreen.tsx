import React from 'react';
import {View} from 'react-native';
import {HeaderBar} from '../../../components';
import MapView, {Marker} from 'react-native-maps';
import {AppNavigationProps} from '../../../navigation/Routes';
import {styleMapViewScreen as style} from './style';

export const MapViewScreen = ({route}: AppNavigationProps<'MapView'>) => {
  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longtitude,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  };

  return (
    <View style={style.container}>
      <HeaderBar text="MapView" isBack={true} />
      <MapView region={region} style={style.container2}>
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
