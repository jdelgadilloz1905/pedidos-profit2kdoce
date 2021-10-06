/** @format */

import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { appCreatePedidosProfit, deletePedidoApi } from '../../api/order'

export default function Pedido(props) {
	const { pedido, setReloadCart, setPedidos, getPedidosCartApi } = props
	const navigation = useNavigation()

	const handleShowProducts = async (item) => {
		navigation.navigate('detail-pedido', { infoProduct: item })
	}

	const handleAddPedido = async (item) => {
		//await deletePedidoApi()
		setReloadCart(true)

		const response = await appCreatePedidosProfit(item)

		if (response.statusCode === 200) {
			Alert.alert(response.mensaje)

			await deletePedidoApi(item.idPedido)
			const pedidos = await getPedidosCartApi()

			setPedidos(pedidos)
			//navigation.navigate('account', { screen: 'orders' }) //del stack account vas a buscar la ventana orders asi es como se utiliza en busquedas entre menu anidado
		} else {
			Alert.alert('Error al realizar el pedido')
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
						<Text>{`Total: ${pedido.datos.totalPayment}`} $</Text>
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
