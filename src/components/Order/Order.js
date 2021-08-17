/** @format */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Order(props) {
	const { order } = props
	const navigation = useNavigation()

	const handleShowProducts = async (item) => {
		navigation.navigate('detail-order', { infoProduct: item })
	}

	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
					{`Pedido: ${order.fact_num}`}
				</Text>
				<Text>{`Cliente: ${order.cli_des}`}</Text>
				<Text>{`Estatus: ${order.estatus}`}</Text>
				<View style={styles.btnsContainer}>
					<View style={styles.centrartotNeto}>
						<Text>{`Total neto: ${order.tot_neto}`} $</Text>
					</View>
					<Button
						color='green'
						icon='clipboard-list-outline'
						onPress={() => handleShowProducts(order.renglones)}
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
