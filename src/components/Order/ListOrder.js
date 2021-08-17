/** @format */

import React, { useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { map } from 'lodash'
import Order from './Order'

export default function ListOrder(props) {
	const { orders } = props
	return (
		<View style={styles.container}>
			{map(orders, (order, index) => (
				<Order key={index} order={order} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 40,
	},
})
