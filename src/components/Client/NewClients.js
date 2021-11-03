/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, LogBox } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { size } from 'lodash'
import { Button, FAB, Portal, Provider } from 'react-native-paper'

import ListClient from './ListClient'
import StatusBar from '../StatusBar'
import ScreenLoading from '../ScreenLoading'
import colors from '../../styles/colors'

import { getLastClientsApi, getAllClientesApi } from '../../api/client'
import useAuth from '../../hooks/useAuth'

export default function NewClients() {
	const [clients, setClients] = useState(null)
	const [reloadClients, setReloadClients] = useState(false)
	const navigation = useNavigation()
	const { auth } = useAuth()

	useFocusEffect(
		useCallback(() => {
			LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
			setClients(null)
			;(async () => {
				const response = await getLastClientsApi(auth)

				setClients(response)
			})()

			setReloadClients(false)
		}, [reloadClients])
	)

	const addUpdateClientes = async () => {
		setReloadClients(true)
		Alert.alert(
			'ACTUALIZAR CLIENTES',
			'¿Estas de acuerdo en actualizar la tabla cliente ?',
			[
				{
					text: 'NO',
				},
				{ text: 'SI', onPress: handleUpdateClientes },
			],
			{ cancelable: false }
		)
		setReloadClients(false)
	}

	const handleUpdateClientes = async () => {
		setClients(null)
		const response = await getAllClientesApi(auth)

		setClients(response)
	}
	const goToAddClient = () => {
		navigation.push('create-client')
	}

	const handleButton = () => {
		return (
			<Button
				mode='contained'
				contentStyle={styles.btnBuyContent}
				labelStyle={styles.btnLabel}
				style={styles.btn}
				loading={reloadClients}
				onPress={addUpdateClientes}>
				Actualizar
			</Button>
		)
	}

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			{!clients ? (
				<ScreenLoading text='Cargando lista' size='large' />
			) : size(clients) === 0 ? (
				<View style={styles.container}>
					<Text style={styles.title}>Lista de Clientes</Text>
					<Text>No se encontraron registros</Text>
					{handleButton()}
				</View>
			) : (
				<ScrollView>
					<View style={styles.container}>
						<View style={styles.row}>
							<View style={[styles.box, styles.two]}>
								<Text style={styles.title}>Lista de Clientes</Text>
							</View>
						</View>
						{handleButton()}

						<Text>{`Encontrados: ${size(clients)}`} </Text>
						<ListClient clients={clients} />
					</View>
				</ScrollView>
			)}
			<Provider>
				<Portal>
					<FAB
						style={styles.fab}
						small
						icon='plus'
						onPress={() => goToAddClient()}
					/>
				</Portal>
			</Provider>
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
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 2,
	},
	btnLabel: {
		fontSize: 12,
	},
	btn: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		margin: 0,
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
})
