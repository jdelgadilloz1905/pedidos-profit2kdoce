/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { size, map, filter } from 'lodash'
import {
	CART,
	API_URL,
	CLIENT,
	SUCURSAL,
	ALMACEN,
	PEDIDOS,
	FORMA_PAGO,
	TRANSPORTE,
} from '../utils/constants'

export async function getProductCartApi() {
	try {
		const cart = await AsyncStorage.getItem(CART)
		console.log('carito de compras ', cart)
		if (!cart) return []
		return JSON.parse(cart) //convierto en un objeto
	} catch (e) {
		return null
	}
}

export async function getPedidosCartApi() {
	try {
		const pedidos = await AsyncStorage.getItem(PEDIDOS)

		if (!pedidos) return []
		return JSON.parse(pedidos) //convierto en un objeto
	} catch (e) {
		return null
	}
}

export async function addProductCartApi(co_art, quantity, price) {
	try {
		const cart = await getProductCartApi()

		if (size(cart) === 0) {
			cart.push({
				co_art,
				quantity,
				price,
			})
		} else {
			let found = false

			map(cart, (product) => {
				if (product.co_art === co_art) {
					let cant = 0

					cant = parseFloat(product.quantity) + parseFloat(quantity)

					product.quantity = cant
					found = true
					return product
				}
			})

			if (!found) {
				cart.push({
					co_art,
					quantity,
					price,
				})
			}
		}

		await AsyncStorage.setItem(CART, JSON.stringify(cart))
		return true
	} catch (e) {
		return false
	}
}

export async function addClientCartApi(client) {
	try {
		await AsyncStorage.setItem(CLIENT, JSON.stringify(client))
		return true
	} catch (e) {
		return false
	}
}

export async function deleteProductCartApi(co_art) {
	try {
		const cart = await getProductCartApi()
		const newCart = filter(cart, (product) => {
			return product.co_art !== co_art
		})
		await AsyncStorage.setItem(CART, JSON.stringify(newCart))
		return true
	} catch (e) {
		return null
	}
}

export async function decreaseProductCartApi(co_art) {
	let isDelete = false

	try {
		const cart = await getProductCartApi()
		map(cart, (product) => {
			if (product.co_art === co_art) {
				if (product.quantity === 1) {
					isDelete = true
					return null
				} else {
					return (product.quantity -= 1)
				}
			}
		})

		if (isDelete) {
			await deleteProductCartApi(co_art)
		} else {
			await AsyncStorage.setItem(CART, JSON.stringify(cart))
		}

		return true
	} catch (e) {
		return null
	}
}

export async function increaseProductCartApi(co_art) {
	try {
		const cart = await getProductCartApi()
		map(cart, (product) => {
			if (product.co_art === co_art) {
				return (product.quantity = parseFloat(product.quantity) + 1)
			}
		})

		await AsyncStorage.setItem(CART, JSON.stringify(cart))
		return true
	} catch (e) {
		return null
	}
}

export async function updateProductCartApi(co_art, quantity) {
	try {
		const cart = await getProductCartApi()
		map(cart, (product) => {
			if (product.co_art === co_art) {
				return (product.quantity = quantity)
			}
		})

		await AsyncStorage.setItem(CART, JSON.stringify(cart))
		return true
	} catch (e) {
		return null
	}
}
export async function setOrderApi(
	products,
	client,
	auth,
	totalPayment,
	formaPago,
	transporte
) {
	try {
		const datoUser = JSON.parse(auth.token)
		const datos = {
			idPedido:
				Math.random().toString(36).substr(2) +
				Math.random().toString(36).substr(2),
			client,
			products,
			datoUser,
			totalPayment,
			formaPago,
			transporte,
		}
		const pedidos = await getPedidosCartApi()

		pedidos.push({
			datos,
		})

		await AsyncStorage.setItem(PEDIDOS, JSON.stringify(pedidos))
		return 200
	} catch (e) {
		return false
	}
}
//DESACTIVADO///////////////////////////
export async function paymentCartApi(
	products,
	client,
	auth,
	totalPayment,
	formaPago,
	transporte
) {
	const co_user = JSON.parse(auth.token).id
	const co_ven = JSON.parse(auth.token).co_ven

	try {
		const url = `${API_URL}/orders/create-order`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				products: products,
				client: client,
				co_user: co_user,
				total_neto: totalPayment,
				transporte: transporte,
				formaPago: formaPago,
				sucursal: SUCURSAL,
				co_ven: co_ven,
				co_alma: ALMACEN,
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
////////////////////////////////////////
export async function deleteCartApi() {
	try {
		await AsyncStorage.removeItem(CART)
		return true
	} catch (e) {
		return null
	}
}

export async function getClientCartApi() {
	try {
		const client = await AsyncStorage.getItem(CLIENT)
		return JSON.parse(client)
	} catch (e) {
		return null
	}
}

export async function getFormaPagoCartApi() {
	try {
		const forma_pago = await AsyncStorage.getItem(FORMA_PAGO)
		return JSON.parse(forma_pago)
	} catch (e) {
		return null
	}
}

export async function getTransporteCartApi() {
	try {
		const transporte = await AsyncStorage.getItem(TRANSPORTE)
		return JSON.parse(transporte)
	} catch (e) {
		return null
	}
}
/*DESACTIVADO*/
export async function getListOptionPedido() {
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

		return result
	} catch (error) {
		console.log(error)
		return error
	}
}
/******************************* */
export async function getCalculatePrice(item) {
	try {
		const datosUSer = await getClientCartApi()

		switch (datosUSer.tipo_precio.trim()) {
			case 'PRECIO 1':
				return item.prec_vta1
				break

			case 'PRECIO 2':
				return item.prec_vta2
				break

			case 'PRECIO 3':
				return item.prec_vta3
				break

			case 'PRECIO 4':
				return item.prec_vta4
				break

			case 'PRECIO 5':
				return item.prec_vta5
				break

			default:
				return 0
				break
		}
	} catch (error) {
		console.log(error)
		return error
	}
}
