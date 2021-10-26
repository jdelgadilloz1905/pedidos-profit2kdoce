/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import StatusBar from '../components/StatusBar'
import Search from '../components/Search/SearchClient'
import useAuth from '../hooks/useAuth'
import ScreenLoading from '../components/ScreenLoading'
import ListClient from '../components/Client/ListClient'
import { getCuentaxCobrarVendedor } from '../api/client'
import colors from '../styles/colors'

export default function Documentos() {
	const [clients, setClients] = useState(null)
	const [reloadCxC, setReloadCxC] = useState(false)
	const { auth } = useAuth()

	useFocusEffect(
		useCallback(() => {
			setClients(null)
			;(async () => {
				const response = await getCuentaxCobrarVendedor(
					JSON.parse(auth.token).co_ven
				)
				console.log(response.infoDocumentos)
				setClients(response.infoDocumentos)
			})()

			setReloadCxC(false)
		}, [reloadCxC])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<Search />

			{!clients ? (
				<ScreenLoading text='Cargando lista' />
			) : size(clients) === 0 ? (
				<View style={styles.container}>
					<Text style={styles.title}>Lista CxC</Text>
					<Text>No hay CxC pendiente</Text>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.row}>
						<View style={[styles.box, styles.two]}>
							<Text style={styles.title}>Lista de Clientes</Text>
						</View>
					</View>

					<Text>{`Encontrados: ${size(clients)}`} </Text>
					<ListClient
						clients={clients}
						auth={auth}
						setReloadCxC={setReloadCxC}
					/>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 5,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
	},
	box: {
		flex: 1,
	},
	box2: {
		marginLeft: 10,
	},
})
