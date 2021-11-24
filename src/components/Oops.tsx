import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeaderBar} from './HeaderBar';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface Props {
  text: string;
}

const Oops = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderBar text={text} isBack={false} />
      <View style={styles.container2}>
        <Image
          source={require('../../assets/Image_Icon/oops.png')}
          style={styles.img}
        />
        <Text style={styles.txtOops}>This function is {text} only</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerBar: {
    flexDirection: 'row',
    flex: 0.07,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtOops: {
    margin: '1%',
    color: '#4c4c4c',
    fontWeight: 'bold',
    fontSize: rf(2.5),
  },

  img: {
    width: '35%',
    height: '30%',
    resizeMode: 'contain',
  },
});

export default Oops;
