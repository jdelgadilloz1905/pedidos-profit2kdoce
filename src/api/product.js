/** @format */
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	API_URL,
	ARTICULOS,
	TASA,
	FORMA_PAGO,
	TRANSPORTE,
} from '../utils/constants'

import { filter } from 'lodash'
export async function searchProductsApi(search) {
	try {
		const articulos = await AsyncStorage.getItem(ARTICULOS)
		const datos = JSON.parse(articulos)

		const newListArt = filter(datos, (product) => {
			return product.art_des.toLowerCase().indexOf(search.toLowerCase()) > -1
		})

		if (newListArt.length === 0) {
			const newListArtCodigo = filter(datos, (product) => {
				return product.co_art.toLowerCase().indexOf(search.toLowerCase()) > -1
			})

			return newListArtCodigo
		} else {
			return newListArt
		}
	} catch (e) {
		return null
	}
}
//DESACTIVADO
export async function searchProductsApi2(search) {
	const artic = await AsyncStorage.getItem(ARTICULOS)

	try {
		const url = `${API_URL}/products/getlike`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				like: search,
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

export async function getProductApi(id) {
	try {
		const url = `${API_URL}/products/getProduct`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_art: id,
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

export async function getLastProuctsApi(limit = 30) {
	//primero valido si existe el localStorage
	try {
		const articulos = await AsyncStorage.getItem(ARTICULOS)

		if (!articulos) {
			try {
				const url = `${API_URL}/products/all`
				const params = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: { limit: limit },
				}
				const response = await fetch(url, params)
				const result = await response.json()
				//almaceno la info en el localStorage
				await AsyncStorage.setItem(ARTICULOS, JSON.stringify(result))
				return result
			} catch (error) {
				console.log('error es : ' + error)
				return null
			}
		} else {
			return JSON.parse(articulos) //convierto en un objeto
		}
	} catch (e) {
		return null
	}
}

export async function getAllProductsApi(limit = 30) {
	try {
		const url = `${API_URL}/products/all`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: { limit: limit },
		}
		const response = await fetch(url, params)
		const result = await response.json()

		//almaceno la info en el localStorage
		await AsyncStorage.setItem(ARTICULOS, JSON.stringify(result))
		return result
	} catch (error) {
		console.log('error es : ' + error)
		return null
	}
}

export async function getTasaApi() {
	try {
		const tasa = await AsyncStorage.getItem(TASA)

		try {
			const url = `${API_URL}/products/get-tasa`
			const params = {
				method: 'POST',
				headers: {
					Accept: 'application/json text/plain, */*',
					'Content-Type': 'application/json',
				},
			}
			const response = await fetch(url, params)
			const result = await response.json()
			await AsyncStorage.setItem(TASA, JSON.stringify(result.infoMoneda))
			return result
		} catch (error) {
			console.log('error es : ' + error)
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function getListOptionCart() {
	try {
		const url = `${API_URL}/orders/datos-pedido`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mostrar: 'transporte,sucursal,condicion',
			}),
		}
		const response = await fetch(url, params)
		const result = await response.json()

		await AsyncStorage.setItem(FORMA_PAGO, JSON.stringify(result.listCond))
		await AsyncStorage.setItem(TRANSPORTE, JSON.stringify(result.listTrans))
		return result
	} catch (error) {
		return null
	}
}
