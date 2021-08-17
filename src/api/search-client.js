/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { size } from 'lodash'
import { SEARCH_HISTORY_CLIENT } from '../utils/constants'
import { sortArrayByDate } from '../utils/functions'

export async function getSearchHistoryClient() {
	try {
		const history = await AsyncStorage.getItem(SEARCH_HISTORY_CLIENT)
		if (!history) return []

		return sortArrayByDate(JSON.parse(history))
	} catch (e) {
		return []
	}
}

export async function updateSearchHistoryClient(search) {
	const history = await getSearchHistoryClient()

	if (size(history) > 5) history.pop()

	history.push({
		search,
		date: new Date(),
	})
	await AsyncStorage.setItem(SEARCH_HISTORY_CLIENT, JSON.stringify(history))
}
