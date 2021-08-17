/** @format */

import React, { useState } from 'react'

import { StyleSheet, Alert, View, Text } from 'react-native'

import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { Button, IconButton } from 'react-native-paper'
import { paymentCartApi, deleteCartApi, setOrderApi } from '../../api/cart'
import { deleteClientApi } from '../../api/client'
import useAuth from '../../hooks/useAuth'

import colors from '../../styles/colors'

export default function Payment(props) {
	const { totalPayment, products, client, formaPago, transporte } = props

	const [loading, setLoading] = useState(false)
	const { auth } = useAuth()
	const navigation = useNavigation()

	const handleSubmit = async () => {
		if (size(client)) {
			setLoading(true)
			//await deleteCartApi()
			if (formaPago === null) {
				Alert.alert('Seleccione la forma de pago')
				setLoading(false)
			} else {
				if (transporte === null) {
					Alert.alert('Seleccione el transporte')
					setLoading(false)
				} else {
					const response = await setOrderApi(
						products,
						client,
						auth,
						totalPayment,
						formaPago,
						transporte
					)
					if (response === 200) {
						Alert.alert('Pedido guardado')
						await deleteCartApi()
						await deleteClientApi()

						//navigation.navigate('account', { screen: 'orders' }) del stack account vas a buscar la ventana orders asi es como se utiliza en busquedas entre menu anidado
						navigation.navigate('account', { screen: 'pedidos' })
						setLoading(false)
					} else {
						Alert.alert('Error al realizar el pedido')

						setLoading(false)
					}
				}
			}
		} else {
			Alert.alert('Debe seleccionar un cliente ')
			navigation.navigate('client')
		}
	}

	//DESACTIVADO
	const handleSubmit1 = async () => {
		if (size(client)) {
			setLoading(true)
			//await deleteCartApi()
			if (formaPago === null) {
				Alert.alert('Seleccione la forma de pago')
				setLoading(false)
			} else {
				if (transporte === null) {
					Alert.alert('Seleccione el transporte')
					setLoading(false)
				} else {
					const response = await paymentCartApi(
						products,
						client,
						auth,
						totalPayment,
						formaPago,
						transporte
					)
					if (response.statusCode === 200) {
						Alert.alert(response.mensaje)
						await deleteCartApi()
						await deleteClientApi()

						navigation.navigate('account', { screen: 'orders' }) //del stack account vas a buscar la ventana orders asi es como se utiliza en busquedas entre menu anidado
						setLoading(false)
					} else {
						Alert.alert('Error al realizar el pedido')

						setLoading(false)
					}
				}
			}
		} else {
			Alert.alert('Debe seleccionar un cliente ')
			navigation.navigate('client')
		}
	}

	return (
		<View style={styles.continer}>
			<Text style={styles.containerTitle}>
				Total Pedido{' '}
				{totalPayment && `(${parseFloat(totalPayment).toFixed(2)} $)`}
			</Text>

			<Button
				mode='contained'
				contentStyle={styles.btnContent}
				labelStyle={styles.btnText}
				onPress={handleSubmit}
				loading={loading}>
				Confirmar pedido
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	continer: {
		marginTop: 40,
		marginBottom: 30,
	},
	containerTitle: {
		paddingBottom: 10,
		fontSize: 18,
		fontWeight: 'bold',
	},
	containerInputs: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	inputCvc: {
		width: '40%',
	},
	containerMonthYearInputs: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	inputDate: {
		width: 100,
		marginRight: 10,
	},
	btnContent: {
		paddingVertical: 4,
		backgroundColor: colors.primary,
	},
	btnText: {
		fontSize: 16,
	},
})
