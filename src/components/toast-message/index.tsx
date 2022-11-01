import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, ToastAndroid, StyleSheet, Text, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {palette, scale} from '../../utils';

export const showToast = (text: string) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

export const showToastLong = (text: string) => {
  ToastAndroid.show(text, ToastAndroid.LONG);
};

export type ToastMessageType = 'Success' | 'Error' | 'Warning' | 'Info';

export interface ToastContentProps {
  iconName: string;
  message: string;
  style: ViewStyle | ViewStyle[];
}

export type ToastMessage = {
  show: (
    toastType: ToastMessageType,
    toastMessage: string,
    toastVisibleTime?: number,
  ) => void;
};

const ToastContent = (props: ToastContentProps) => {
  const {iconName, message, style} = props;
  return (
    <View style={StyleSheet.flatten([styles.contentContainer, style])}>
      <MaterialIcons name={iconName} color={palette.white} size={24} />
      <Text style={styles.textContent}>{message}</Text>
    </View>
  );
};

export const ToastMessage = forwardRef((_props, ref) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<ToastMessageType>('Success');
  const [message, setMessage] = useState<string>('');
  const [visibleTime, setVisibleTime] = useState<number>(null);
  const toggleModal = () => {
    setVisible(false);
  };
  useImperativeHandle(ref, () => ({
    show: (
      toastType: ToastMessageType,
      toastMessage: string,
      toastVisibleTime?: number,
    ) => {
      setVisible(true);
      setType(toastType);
      setMessage(toastMessage);
      setVisibleTime(toastVisibleTime);
    },
  }));
  useEffect(() => {
    if (visibleTime) {
      setTimeout(() => toggleModal(), visibleTime);
    } else {
      setTimeout(() => toggleModal(), 2500);
    }
  });

  const renderContent = (toastType: ToastMessageType) => {
    switch (toastType) {
      case 'Success':
        return (
          <ToastContent
            iconName="check-circle"
            message={message}
            style={styles.success}
          />
        );
      case 'Error':
        return (
          <ToastContent
            iconName="error"
            message={message}
            style={styles.error}
          />
        );
      case 'Warning':
        return (
          <ToastContent
            iconName="warning"
            message={message}
            style={styles.warning}
          />
        );
      case 'Info':
        return (
          <ToastContent iconName="info" message={message} style={styles.info} />
        );
      default:
        return (
          <ToastContent
            iconName="check-circle"
            message={message}
            style={styles.success}
          />
        );
    }
  };

  return (
    <Modal
      style={styles.modalContainer}
      isVisible={isVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      {renderContent(type)}
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    bottom: '5%',
    width: '80%',
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
  },
  textContent: {
    padding: '2%',
    fontSize: scale(2),
    fontWeight: 'normal',
    color: palette.white,
    paddingLeft: '5%',
  },
  success: {
    backgroundColor: palette.green,
  },
  error: {
    backgroundColor: palette.red,
  },
  warning: {
    backgroundColor: palette.orange,
  },
  info: {
    backgroundColor: palette.blue,
  },
});
