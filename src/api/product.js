/** @format */
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	API_URL,
	ARTICULOS,
	UNIDAD,
	STOCK,
	PRECIOS,
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

export async function getBuscarStockArt(item) {
	const stock = await AsyncStorage.getItem(STOCK)
	const datosStock = JSON.parse(stock)

	const newListSto = filter(datosStock, (product) => {
		return product.co_art.toLowerCase().indexOf(item.toLowerCase()) > -1
	})

	if (newListSto.length !== 0) {
		return parseInt(newListSto[0].stock_act)
	}
}

// export async function getProductApi(co_art) {
// 	//busco la informacion del producto
// 	try {
// 		const url = `${API_URL}/products/getProduct`
// 		const params = {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json text/plain, */*',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				co_art: id,
// 			}),
// 		}
// 		const response = await fetch(url, params)
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.log(error)
// 		return null
// 	}
// }

/*===============================================
LISTA DE PRODUCTOS
================================================= */
export async function getLastProuctsApi() {
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
				}
				const response = await fetch(url, params)
				const result = await response.json()

				if (result.statusCode === 200) {
					//almaceno la info en el localStorage

					await AsyncStorage.setItem(
						ARTICULOS,
						JSON.stringify(result.infoProduct)
					)
					return result.infoProduct
				} else {
					console.log('Error al cargar los productos')
				}
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

/*===============================================
LISTA DE STOCK DE PRODUCTOS
================================================= */
export async function getStockProducto() {
	try {
		const stockProductos = await AsyncStorage.getItem(STOCK)

		if (!stockProductos) {
			try {
				const url = `${API_URL}/products/stock-producto`
				const params = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
				const response = await fetch(url, params)
				const result = await response.json()
				if (result.statusCode === 200) {
					await AsyncStorage.setItem(
						STOCK,
						JSON.stringify(result.infoStockArticulo)
					)
					return result
				} else {
					console.log('Error al cargar el Stock de los productos')
				}
			} catch (error) {
				console.log('error es : ' + error)
				return null
			}
		} else {
			return JSON.parse(stockProductos) //convierto en un objeto
		}
	} catch (e) {
		return null
	}
}

/*===============================================
LISTA DE UNIDAD DE PRODUCTOS
================================================= */
export async function getUnidadProducto() {
	try {
		const unidadProductos = await AsyncStorage.getItem(UNIDAD)

		if (!unidadProductos) {
			try {
				const url = `${API_URL}/products/unidad-producto`
				const params = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
				const response = await fetch(url, params)
				const result = await response.json()
				if (result.statusCode === 200) {
					//almaceno la info en el localStorage

					await AsyncStorage.setItem(
						UNIDAD,
						JSON.stringify(result.infoUnidadArticulo)
					)
					return result
				} else {
					console.log('Error al cargar las unidades')
				}
			} catch (error) {
				console.log('error es : ' + error)
				return null
			}
		} else {
			return JSON.parse(unidadProductos) //convierto en un objeto
		}
	} catch (e) {
		return null
	}
}

/*===============================================
LISTA DE PRECIOS DE PRODUCTOS
================================================= */
export async function getPrecioProducto() {
	try {
		const precioProductos = await AsyncStorage.getItem(PRECIOS)

		if (!precioProductos) {
			try {
				const url = `${API_URL}/products/precio-producto`
				const params = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
				const response = await fetch(url, params)
				const result = await response.json()
				if (result.statusCode === 200) {
					//almaceno la info en el localStorage

					await AsyncStorage.setItem(
						PRECIOS,
						JSON.stringify(result.infoPrecioArticulo)
					)
					return result
				} else {
					console.log('Error al cargar los precios')
				}
			} catch (error) {
				console.log('error es : ' + error)
				return null
			}
		} else {
			return JSON.parse(precioProductos) //convierto en un objeto
		}
	} catch (e) {
		return null
	}
}

/**==========================================
 * ACTUALIZO TODAS LAS TABLAS
 * ========================================== */
export async function getAllProductsApi() {
	await AsyncStorage.removeItem(ARTICULOS)
	await AsyncStorage.removeItem(PRECIOS)
	await AsyncStorage.removeItem(UNIDAD)
	await AsyncStorage.removeItem(STOCK)

	await getPrecioProducto()
	await getStockProducto()
	await getUnidadProducto()
	const response = await getLastProuctsApi()

	return response

	/*try {
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
	}*/
}

/*=========================================
BUSCO LISTA DE CONDICIONES DE PAGO Y 
TRANSPORTES 
===========================================*/
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
