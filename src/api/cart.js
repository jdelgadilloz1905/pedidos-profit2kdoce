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
	PRECIOS,
	API_URL_LICENCE,
} from '../utils/constants'

export async function getProductCartApi() {
	try {
		//await AsyncStorage.removeItem(CART)
		const cart = await AsyncStorage.getItem(CART)

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

export async function addProductCartApi(
	co_art,
	art_des,
	quantity,
	price,
	stock_act = 0,
	descuento = '0.00'
) {
	try {
		const cart = await getProductCartApi()

		if (size(cart) === 0) {
			cart.push({
				co_art,
				art_des,
				quantity,
				price,
				stock_act,
				descuento,
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
					art_des,
					quantity,
					price,
					stock_act,
					descuento,
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
				if (product.quantity === 1 || product.quantity === '1') {
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
				if (product.stock_act > product.quantity) {
					return (product.quantity = parseFloat(product.quantity) + 1)
				}
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
export async function updateProductCartDescuentoApi(co_art, descuento) {
	try {
		const cart = await getProductCartApi()
		//console.log('mis productos del carrito ', cart)
		map(cart, (product) => {
			if (product.co_art === co_art) {
				return (product.descuento = descuento)
				// if (parseFloat(descuento) > 0) {
				// 	return (product.descuento = descuento)
				// }
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
		const co_art = item.co_art
		const datosUSer = await getClientCartApi()
		const precios = await AsyncStorage.getItem(PRECIOS)
		const datosPrecio = JSON.parse(precios)

		const newListPre = filter(datosPrecio, (product) => {
			return product.co_art.toLowerCase().indexOf(co_art.toLowerCase()) > -1
		})

		if (newListPre.length !== 0) {
			const newPrecio = filter(newListPre, (precio) => {
				//return precio.co_precio.indexOf(datosUSer.tipo_precio.trim()) > -1
				return precio.co_precio > 0
			})

			return parseFloat(newPrecio[0].monto).toFixed(2)
		}
	} catch (error) {
		console.log(error)
		return error
	}
}
