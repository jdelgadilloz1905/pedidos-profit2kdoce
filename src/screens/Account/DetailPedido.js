/** @format */

import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { map } from 'lodash'
import { MONEDA } from '../../utils/constants'

export default function DetailPedido(props) {
	const infoProduct = props.route.params.infoProduct

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{map(infoProduct, (item) => (
				<View key={item.co_art} style={styles.product}>
					<View style={styles.info}>
						<View>
							<Text style={styles.name} numberOfLines={3} ellipsizeMode='tail'>
								{item.art_des}
							</Text>
							<View style={styles.prices}>
								<Text style={styles.currentPrice}>{`Precio: ${parseFloat(
									item.price
								).toFixed(2)} ${MONEDA}`}</Text>
								<Text
									style={
										styles.currentPrice
									}>{`Cantidad: ${item.quantity} `}</Text>
								<Text
									style={
										styles.currentPrice
									}>{`Descuento: ${item.descuento} %`}</Text>
								<Text style={styles.currentPrice}>{`Total: ${
									item.descuento === ''
										? parseFloat(
												item.quantity * parseFloat(item.price).toFixed(2)
										  ).toFixed(2)
										: (parseFloat(item.price).toFixed(2) -
												(parseFloat(item.price).toFixed(2) *
													parseFloat(item.descuento).toFixed(2)) /
													100) *
										  item.quantity
								} ${MONEDA}`}</Text>
							</View>
						</View>
					</View>
				</View>
			))}
		</ScrollView>
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
	product: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#dadde1',
	},
	info: {
		padding: 10,
		width: '100%',
		justifyContent: 'space-between',
	},
	name: {
		fontSize: 16,
	},
	prices: {
		marginTop: 5,
	},
	currentPrice: {
		fontSize: 15,
	},
})
