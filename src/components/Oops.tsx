import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeaderBar} from './HeaderBar';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface OopsProps {
  text: string;
}

export const Oops = ({text}: OopsProps) => {
  return (
    <View style={styles.container}>
      <HeaderBar text={text} isBack={false} />
      <View style={styles.container2}>
        <Image
          source={require('../../assets/Image_Icon/oops.png')}
          style={styles.image}
        />
        <Text style={styles.textOops}>This function is {text} only</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  textOops: {
    margin: '1.5%',
    color: '#4c4c4c',
    fontWeight: 'bold',
    fontSize: rf(2.5),
  },

  image: {
    width: '35%',
    height: '30%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});
