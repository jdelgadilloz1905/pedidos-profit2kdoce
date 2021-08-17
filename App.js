/** @format */

import React, { useState, useEffect, useMemo } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import jwtDecode from 'jwt-decode'
import AuthScreen from './src/screens/AuthScreen'
import UserNavigation from './src/navigation/UserNavigation'
import { getTokenApi, setTokenApi, removeTokenApi } from './src/api/token'
import AuthContext from './src/context/AuthContext'
import { FECHA_VENCIMIENTO, FECHA_ACTUAL } from './src/utils/constants'
import { Alert, LogBox } from 'react-native'

export default function App() {
	const [auth, setAuth] = useState(undefined)
	LogBox.ignoreAllLogs()
	//removeTokenApi()
	useEffect(() => {
		;(async () => {
			const token = await getTokenApi()
			//verifico la version de la APP
			if (FECHA_ACTUAL >= FECHA_VENCIMIENTO) {
				Alert.alert(
					'Su vesion de App se encuentra desactualizada, por favor contacte con el administrador'
				)
				setAuth(null)
				logout()
			} else {
				/*Alert.alert(
					'Bienvenido, esta es una version demo, para continuar pulse ok'
				)*/

				if (token) {
					setAuth({
						token,
						//idUser: jwtDecode(token).id,
					})
				} else {
					setAuth(null)
				}
			}
		})()
	}, [])

	const login = (user) => {
		setTokenApi(JSON.stringify(user.infoUser)) //CREO EL TOKEN SI NO EXISTE
		setAuth({
			token: JSON.stringify(user.infoUser),
			//idUser: jwtDecode(user.jwt).id,
		}) //actualiza la contsante con los dos valores token e IdUser
	}

	const logout = () => {
		//para cerrar sesion
		if (auth) {
			removeTokenApi()
			setAuth(null)
		}
	}

	const authData = useMemo(
		() => ({
			auth,
			login,
			logout,
			setReloadUser: null,
		}),
		[auth]
	)

	if (auth === undefined) return null

	return (
		<AuthContext.Provider value={authData}>
			<PaperProvider>
				{auth ? <UserNavigation /> : <AuthScreen />}
			</PaperProvider>
		</AuthContext.Provider>
	)
}
