/** @format */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, TASA } from '../utils/constants'

export async function getTasa() {
	try {
		const tasa = await AsyncStorage.getItem(TASA)
		if (!tasa) {
			return 'Debe actualizar la tasa'
		} else {
			return JSON.parse(tasa)
		}
	} catch (e) {
		return null
	}
}
