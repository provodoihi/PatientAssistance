import {
  responsiveScreenFontSize as rf,
  responsiveScreenHeight as rh,
} from 'react-native-responsive-dimensions';

export const scale = (size: number) => rf(size);
export const heightScale = (height: number) => rh(height);
