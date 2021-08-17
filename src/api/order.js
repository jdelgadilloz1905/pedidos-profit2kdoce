/** @format */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, SUCURSAL, ALMACEN, PEDIDOS } from '../utils/constants'
import { filter } from 'lodash'

export async function getOrdersApi(auth) {
	const co_user = JSON.parse(auth.token).id

	try {
		const url = `${API_URL}/orders/order-user`
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
		return null
	}
}

export async function getPedidosApiReport(co_user, dateStart, dateEnd) {
	try {
		const url = `${API_URL}/orders/report-order`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_user: co_user,
				dateStart: dateStart,
				dateEnd: dateEnd,
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

export async function appCreatePedidosProfit(item) {
	const co_user = item.datoUser.id
	const co_ven = item.datoUser.co_ven

	try {
		const url = `${API_URL}/orders/create-order`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				products: item.products,
				client: item.client,
				co_user: co_user,
				total_neto: item.totalPayment,
				transporte: item.transporte,
				formaPago: item.formaPago,
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

export async function deletePedidoApi(idPedido) {
	//DEBO BUSCAR EL ID QUE DEBO ELIMINAR PRIMERO

	try {
		const pedidos = await AsyncStorage.getItem(PEDIDOS)
		const oldPedidos = JSON.parse(pedidos)
		const newPedidos = filter(oldPedidos, (pedido) => {
			return pedido.datos.idPedido !== idPedido
		})

		await AsyncStorage.setItem(PEDIDOS, JSON.stringify(newPedidos))
		return true
	} catch (e) {
		console.log('error ', e)
		return null
	}
}
