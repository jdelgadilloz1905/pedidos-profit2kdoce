/** @format */

import React, { useState } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { map } from 'lodash'
import Pedido from './Pedido'

export default function ListPedido(props) {
	const { pedidos, getPedidosCartApi, setPedidos } = props
	const [reloadCart, setReloadCart] = useState(false)
	return (
		<>
			<View style={styles.container}>
				{map(pedidos, (pedido, index) => (
					<Pedido
						key={index}
						pedido={pedido}
						setReloadCart={setReloadCart}
						getPedidosCartApi={getPedidosCartApi}
						setPedidos={setPedidos}
					/>
				))}
			</View>
			{reloadCart && (
				<View style={styles.reload}>
					<ActivityIndicator size='large' color='#fff' />
					<Text style={styles.reloadText}>
						Espere un momento, estamos procesando el pedido...
					</Text>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 40,
	},
	reload: {
		backgroundColor: '#000',
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	reloadText: {
		marginTop: 5,
		color: '#000',
		fontWeight: 'bold',
	},
})
