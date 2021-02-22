import { PixelRatio } from 'react-native';

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();