/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import ListOrder from '../../components/Order/ListOrder'
import ScreenLoading from '../../components/ScreenLoading'
import { getOrdersApi } from '../../api/order'
import StatusBar from '../../components/StatusBar'
import NoRecord from '../../components/Cart/NotProducts'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'

export default function Orders() {
	const [orders, setOrders] = useState(null)
	const { auth } = useAuth()
	const [reloadProducts, setReloadProducts] = useState(false)

	useFocusEffect(
		useCallback(() => {
			setOrders(null)
			;(async () => {
				const response = await getOrdersApi(auth)

				if (response.statusCode === 200) {
					setOrders(response.infoOrder)
				} else {
					setOrders({})
				}
			})()

			setReloadProducts(false)
		}, [reloadProducts])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			<ScrollView style={styles.container}>
				{!orders ? (
					<ScreenLoading text='Cargando lista' size='large' />
				) : size(orders) === 0 ? (
					<NoRecord />
				) : (
					<ListOrder orders={orders} />
				)}
			</ScrollView>
		</>
	)
}

var styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 10,
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
