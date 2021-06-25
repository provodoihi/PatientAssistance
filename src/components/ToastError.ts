import {ToastAndroid} from 'react-native';

const showToastFail = () => {
  ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
};

export default showToastFail;
