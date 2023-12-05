import { Dimensions } from 'react-native';

export function generateUniqueId(prefix?: string) {
  return `${prefix || 'uniqueId'}_${Math.floor(Math.random() * 9999)}`;
}

export const screenWidth = Dimensions.get('screen').width;
