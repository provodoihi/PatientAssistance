import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

interface ModalLoadProps {
  isVisibleLoad: boolean;
}

export const ModalLoad = ({isVisibleLoad}: ModalLoadProps) => {
  return (
    <Modal isVisible={isVisibleLoad}>
      <View style={styles.modalLoad}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  modalLoad: {
    backgroundColor: '#ffffff',
    flex: 0.2,
    width: '80%',
    justifyContent: 'center',
    borderRadius: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
