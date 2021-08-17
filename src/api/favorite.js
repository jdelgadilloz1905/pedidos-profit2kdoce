/** @format */

import { size } from 'lodash'
import { API_URL } from '../utils/constants'

export async function addFavoriteApi(co_user, co_art) {
	try {
		const url = `${API_URL}/products/add-favorites`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_art: co_art,
				co_user: co_user,
			}),
		}
		const response = await fetch(url, params)
		const result = await response.json()
		return result
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function isFavoriteApi(co_user, co_art) {
	try {
		const url = `${API_URL}/products/favorites`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_art: co_art,
				co_user: co_user,
			}),
		}
		const response = await fetch(url, params)
		const result = await response.json()

		return result
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function deleteFavoriteApi(co_user, co_art) {
	try {
		const dataFound = await isFavoriteApi(co_user, co_art)
		if (size(dataFound) > 0) {
			const url = `${API_URL}/products/delete-favorites/`
			const params = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					co_art: co_art,
					co_user: co_user,
				}),
			}
			const response = await fetch(url, params)
			const result = await response.json()
			return result
		}
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function getFavoriteApi(co_user) {
	try {
		const url = `${API_URL}/products/getFavoriteApi`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_user: co_user,
			}),
		}
		const response = await fetch(url, params)
		const result = await response.json()
		return result
	} catch (error) {
		console.log(error)
		return []
	}
}
