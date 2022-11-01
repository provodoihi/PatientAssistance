import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {palette, scale} from '../../utils';

interface ModalLoadProps {
  isVisibleLoad: boolean;
}

export const ModalLoad = ({isVisibleLoad}: ModalLoadProps) => {
  const {t} = useTranslation();
  if (isVisibleLoad === false) {
    return null;
  }
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.modalLoad}>
        <ActivityIndicator size="large" color={palette.blue} />
        <Text style={styles.text}>{t('common.loading')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.backgroundTransparent,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: scale(2.5),
    marginTop: scale(3),
    fontWeight: '600',
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
