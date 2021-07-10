import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isVisibleLoad: boolean;
}

const ModalLoad = ({isVisibleLoad}: Props) => {
  return (
    <Modal isVisible={isVisibleLoad}>
      <View style={styles.modalLoad}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.txt}>Loading</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  modalLoad: {
    backgroundColor: '#ffffff',
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalLoad;
