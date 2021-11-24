import {ToastAndroid} from 'react-native';

export const showToast = (text: string) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
