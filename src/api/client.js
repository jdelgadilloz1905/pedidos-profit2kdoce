/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, CLIENT, CLIENTES, SUCURSAL } from '../utils/constants'
import { filter } from 'lodash'
export async function searchClientsApi(search) {
	try {
		const clientes = await AsyncStorage.getItem(CLIENTES)
		const datos = JSON.parse(clientes)

		const newListCli = filter(datos, (cliente) => {
			return cliente.cli_des.toLowerCase().indexOf(search.toLowerCase()) > -1
		})

		if (newListCli.length === 0) {
			const newListCliCodigo = filter(datos, (cliente) => {
				return cliente.co_cli.toLowerCase().indexOf(search.toLowerCase()) > -1
			})

			return newListCliCodigo
		} else {
			return newListCli
		}
	} catch (e) {
		return null
	}
}
//DESACTIVADO
export async function searchClientsApi222222(search) {
	try {
		const url = `${API_URL}/clients/getlike`
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

export async function getClientApi(id) {
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

export async function getLastClientsApi(auth) {
	//primero valido si existe el localStorage
	const co_ven = JSON.parse(auth.token).co_ven
	try {
		const clientes = await AsyncStorage.getItem(CLIENTES)

		if (!clientes) {
			//cantidad de caracteres
			try {
				const url = `${API_URL}/clients/all`
				const params = {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						co_ven: co_ven,
					}),
				}
				const response = await fetch(url, params)
				const result = await response.json()

				await AsyncStorage.setItem(CLIENTES, JSON.stringify(result))
				return result
			} catch (error) {
				console.log('error es : ' + error)
				return null
			}
		} else {
			return JSON.parse(clientes) //convierto en un objeto
		}
	} catch (e) {
		return null
	}
}
export async function deleteClientApi() {
	try {
		await AsyncStorage.removeItem(CLIENT)
		return true
	} catch (e) {
		return null
	}
}

export async function getCuentaxCobrar(item) {
	try {
		const url = `${API_URL}/clients/cuenta-cobrar`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_cli: item,
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

export async function getCuentaxCobrarVendedor(co_ven) {
	try {
		const url = `${API_URL}/clients/cxc-vendedor`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_ven: co_ven,
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

export async function getObtenerNotasEntrega(item) {
	try {
		const url = `${API_URL}/clients/report-notaentrega`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_cli: item,
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

export async function getObtenerCobrosCliente(item) {
	try {
		const url = `${API_URL}/clients/documentos-cliente`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_cli: item,
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

export async function getAllClientesApi(auth) {
	const co_ven = JSON.parse(auth.token).co_ven
	try {
		const url = `${API_URL}/clients/all`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				co_ven: co_ven,
			}),
		}
		const response = await fetch(url, params)
		const result = await response.json()
		await AsyncStorage.setItem(CLIENTES, JSON.stringify(result))
		return result
	} catch (error) {
		console.log('error es : ' + error)
		return null
	}
}

export async function getOptionsClient() {
	try {
		const url = `${API_URL}/clients/buscar-options`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
		const response = await fetch(url, params)
		const result = await response.json()

		return result
	} catch (error) {
		console.log('error es : ' + error)
		return null
	}
}

export async function registerClientApi(
	formData,
	condicion,
	tipo,
	segmento,
	auth,
	checkLunes,
	checkMartes,
	checkMiercoles,
	checkJueves,
	checkViernes,
	checkSabado,
	checkDomingo
) {
	const co_ven = JSON.parse(auth.token).co_ven

	try {
		const url = `${API_URL}/clients/client-register`
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nombre: formData.nombre,
				rif: formData.rif,
				direccion: formData.direccion,
				direccionEntrega: formData.direccionEntrega,
				email: formData.email,
				telefono: formData.telefono,
				responsable: formData.responsable,
				ciudad: formData.ciudad,
				comentario: formData.comentario,
				tipo: tipo,
				condicion: condicion,
				segmento: segmento,
				co_ven: co_ven,
				sucursal: SUCURSAL,
				lunes: checkLunes,
				martes: checkMartes,
				miercoles: checkMiercoles,
				jueves: checkJueves,
				viernes: checkViernes,
				sabado: checkSabado,
				domingo: checkDomingo,
				s,
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
