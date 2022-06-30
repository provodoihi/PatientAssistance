import {useEffect} from 'react';
import {BackHandler} from 'react-native';

function useBackHandler(_callback: () => void) {
  useEffect(() => {
    const backAction = () => {
      if (typeof _callback === 'function') {
        _callback();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [_callback]);
}

export {useBackHandler};
