import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HeaderBar from './HeaderBar';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface Props {
  text: string;
}

const Oops = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderBar text="For Admin" />
      <View style={[styles.container2]}>
        <Image source={require('../../assets/oops.png')} style={styles.img} />
        <Text style={styles.txtOops}>This function for {text} only</Text>
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

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtHeader: {
    margin: '1%',
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtOops: {
    margin: '1%',
    color: '#4c4c4c',
    fontWeight: 'bold',
    fontSize: rf(2.5),
  },

  img: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
  },

  button2: {
    margin: '1%',
  },
});

export default Oops;
