/** @format */

import { API_URL } from '../utils/constants'

export async function registerApi(formData, co_ven) {
	try {
		const url = `${API_URL}/auth/user-register`
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				username: formData.username,
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
//VALIDACION PARA INGRESAR AL SISTEMA
export async function loginApi(formData) {
	try {
		const url = `${API_URL}/auth/login`
		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}
		const response = await fetch(url, params)
		const result = await response.json()

		return result
	} catch (error) {
		console.log('error es : ' + error)
		return null
	}
}

export async function getMeApi(token) {
	try {
		const url = `${API_URL}/users/me`
		const params = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		const response = await fetch(url, params)
		const result = await response.json()
		return result
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function updateUserApi(auth, formData) {
	const id = JSON.parse(auth.token).id
	try {
		const url = `${API_URL}/auth/change-name`

		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				nombre: formData.name,
				apellido: formData.lastname,
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

export async function updateUserPasswordApi(auth, formData) {
	const id = JSON.parse(auth.token).id

	try {
		const url = `${API_URL}/auth/change-password`

		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				password: formData.password,
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

export async function updateUserDataApi(auth, formData) {
	const id = JSON.parse(auth.token).id

	try {
		const url = `${API_URL}/auth/change-email`

		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				email: formData.email,
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

export async function updateUserNameApi(auth, formData) {
	const id = JSON.parse(auth.token).id

	try {
		const url = `${API_URL}/auth/change-username`

		const params = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
				usuario: formData.username,
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
export async function getVendedorApi(limit = 30) {
	try {
		const url = `${API_URL}/auth/vendedor`
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

		return result
	} catch (error) {
		console.log('error es : ' + error)
		return null
	}
}
