import { Platform, StatusBar } from 'react-native'
import { theme } from 'galio-framework'
import AsyncStorage from '@react-native-community/async-storage'

export const StatusHeight = StatusBar.currentHeight
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0)
export const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812)
// export const baseUrl = 'https://ykp2n.herokuapp.com/api/v1'
export const baseUrl = 'http://192.168.100.40:4000/api/v1'

export const setItem = (key, data) => {
  AsyncStorage.setItem(key, data)
}

export const getItem = async (key) => {
  const data = await AsyncStorage.getItem(key)
  const result = JSON.parse(data)
  return result
}
