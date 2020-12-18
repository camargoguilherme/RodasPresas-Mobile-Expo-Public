import {Dimensions, PixelRatio, Platform} from 'react-native';

export const Width = Dimensions.get('screen').width;
export const Height = Dimensions.get('screen').height;

export const widthPercentageToDP = (widthPercent: string) => {
  return PixelRatio.roundToNearestPixel(
    (Width * parseFloat(widthPercent)) / 100
  );
};

export const heightPercentageToDP = (heightPercent: string) => {
  return PixelRatio.roundToNearestPixel(
    (Height * parseFloat(heightPercent)) / 100
  );
};


// based on iphone 5s's scale
const scale = Width / 320;

export function normalize(size: number) {
  const newSize = size * scale
  const measure = Math.round(PixelRatio.roundToNearestPixel(newSize))

  return Platform.OS === 'ios' ?
    measure :
    measure - 2

}

