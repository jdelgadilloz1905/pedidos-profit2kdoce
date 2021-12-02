/** @format */

import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Alert,
	ActivityIndicator,
	Platform,
} from 'react-native'
import * as Location from 'expo-location'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {
	appCreatePedidosProfit,
	deletePedidoApi,
	enviarEmailAddPedido,
} from '../../api/order'
import { getLicenceApi, removeLicenceApi } from '../../api/token'
import { MONEDA } from '../../utils/constants'

export default function Pedido(props) {
	const { pedido, setReloadCart, setPedidos, getPedidosCartApi } = props

	const [displayCurrentAddress, setDisplayCurrentAddress] = useState('')
	const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
	const [isLicencia, setLicencia] = useState(null)

	const navigation = useNavigation()

	const handleShowProducts = async (item) => {
		navigation.navigate('detail-pedido', { infoProduct: item })
	}

	useEffect(() => {
		validateLicencia()
		CheckIfLocationEnabled()
		requestLocationPermission()
	}, [])

	const validateLicencia = async () => {
		const data = await getLicenceApi()

		if (data) {
			setLicencia(JSON.parse(data))
		} else {
			Alert.alert(
				'Versión Demo',
				'Para exportar los datos debe activar la licencia, dirijase a ACERCA DE',
				[{ text: 'OK' }],
				{ cancelable: false }
			)
		}
	}

	const CheckIfLocationEnabled = async () => {
		let enabled = await Location.hasServicesEnabledAsync()
		if (!enabled) {
			Alert.alert(
				'Servicio de ubicación no habilitado',
				'Habilite sus servicios de ubicación para continuar',
				[{ text: 'OK' }],
				{ cancelable: false }
			)
		} else {
			setLocationServiceEnabled(enabled)
		}
	}

	const requestLocationPermission = async () => {
		//valido si esta habilitado la opcion de GPS

		if (Platform.OS !== 'android') {
			Alert.alert(
				'Vaya, esto no funcionará en un emulador de Android. Pruébelo en su dispositivo!'
			)
			return
		}
		let { status } = await Location.requestPermissionsAsync()
		if (status !== 'granted') {
			Alert.alert(
				'Se denegó el permiso para acceder a la ubicación',
				'Permita que la aplicación use el servicio de ubicación.',
				[{ text: 'OK' }],
				{ cancelable: false }
			)
			return
		}
		let { coords } = await Location.getCurrentPositionAsync({})

		if (coords) {
			const { latitude, longitude } = coords
			let response = await Location.reverseGeocodeAsync({
				latitude,
				longitude,
			})

			for (let item of response) {
				let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`
				setDisplayCurrentAddress(address)
			}
		}
	}

	const handleAddPedido = async (item) => {
		//await deletePedidoApi()
		setReloadCart(true)
		/*=================================================== 
				VALIDAR SI LA LICENCIA ESTA ACTIVA O NO :-D
		=================================================== */
		let fechaF = new Date(isLicencia.fecha_fin)
		if (new Date() >= fechaF) {
			await removeLicenceApi()
			Alert.alert(
				'No se genero el pedido',
				'Su licencia esta vencida, contacte con el administrador ',
				[{ text: 'OK' }],
				{ cancelable: false }
			)
		} else {
			if (displayCurrentAddress === '') {
				//displayCurrentAddress !== '' para validar direccion
				const response = await appCreatePedidosProfit(
					item,
					displayCurrentAddress
				)

				if (response.statusCode === 200) {
					Alert.alert(response.mensaje)

					const resultadoEmail = await enviarEmailAddPedido(
						item,
						response.pedido
					)

					await deletePedidoApi(item.idPedido)

					const pedidos = await getPedidosCartApi()

					setPedidos(pedidos)
					//navigation.navigate('account', { screen: 'orders' }) //del stack account vas a buscar la ventana orders asi es como se utiliza en busquedas entre menu anidado
				} else {
					Alert.alert(response.mensaje)
					//Alert.alert('Error al crear el pedido')
				}
			} else {
				Alert.alert(
					'No se genero el pedido',
					'Permita que la aplicación use el servicio de ubicación.',
					[{ text: 'OK' }],
					{ cancelable: false }
				)
				setReloadCart(false)
			}
		}

		setReloadCart(false)
	}

	const handleSendPedido = async (item) => {
		Alert.alert(
			'EXPORTAR PEDIDO',
			'¿Estas de acuerdo en crear el pedido ?',
			[
				{
					text: 'NO',
				},
				{ text: 'SI', onPress: () => handleAddPedido(item) },
			],
			{ cancelable: false }
		)
	}

	const handleDeletePedido = async (item) => {
		Alert.alert(
			'ELIMINAR PEDIDO',
			'¿Estas de acuerdo en eliminar el pedido ?',
			[
				{
					text: 'NO',
				},
				{ text: 'SI', onPress: () => handleEliminarPedido(item) },
			],
			{ cancelable: false }
		)
	}
	const handleEliminarPedido = async (item) => {
		await deletePedidoApi(item)

		const pedidos = await getPedidosCartApi()

		setPedidos(pedidos)
	}

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
					{`ID: ${pedido.datos.idPedido}`}
				</Text>
				<Text>{`Cliente: ${pedido.datos.client.cli_des}`}</Text>
				<Text>{`Estatus: No sincronizado`}</Text>
				<View style={styles.btnsContainer}>
					<View style={styles.centrartotNeto}>
						<Text>{`Total: ${pedido.datos.totalPayment} ${MONEDA}`} </Text>
					</View>
					<Button
						color='green'
						icon='clipboard-list-outline'
						onPress={() => handleShowProducts(pedido.datos.products)}
					/>
					<Button
						color='green'
						icon='send'
						onPress={() => handleSendPedido(pedido.datos)}
					/>
					<Button
						color='red'
						icon='delete'
						onPress={() => handleDeletePedido(pedido.datos.idPedido)}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: '#ddd',
		paddingVertical: 5,
		flexDirection: 'row',
	},

	info: {
		width: '100%',
		justifyContent: 'center',
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	btnsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		width: '100%',
	},
	centrartotNeto: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	footer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
})
