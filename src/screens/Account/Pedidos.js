/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import ListPedido from '../../components/Order/ListPedido'
import ScreenLoading from '../../components/ScreenLoading'

import { getPedidosCartApi } from '../../api/cart'
import StatusBar from '../../components/StatusBar'
import NoRecord from '../../components/Cart/NotProducts'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'

export default function Pedidos() {
	const [pedidos, setPedidos] = useState(null)
	const { auth } = useAuth()
	const [reloadProducts, setReloadProducts] = useState(false)

	useFocusEffect(
		useCallback(() => {
			setPedidos(null)
			;(async () => {
				const response = await getPedidosCartApi()

				setPedidos(response)
			})()

			setReloadProducts(false)
		}, [reloadProducts])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<ScrollView style={styles.container}>
				{!pedidos ? (
					<ScreenLoading text='Cargando lista' size='large' />
				) : size(pedidos) === 0 ? (
					<NoRecord />
				) : (
					<ListPedido
						pedidos={pedidos}
						getPedidosCartApi={getPedidosCartApi}
						setPedidos={setPedidos}
					/>
				)}
			</ScrollView>
		</>
	)
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 20,
	},
	addAddress: {
		borderWidth: 0.9,
		borderRadius: 5,
		borderColor: '#ddd',
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noOrdersText: {
		textAlign: 'center',
		paddingTop: 20,
		fontSize: 18,
	},
	loading: {
		marginTop: 20,
	},
})
