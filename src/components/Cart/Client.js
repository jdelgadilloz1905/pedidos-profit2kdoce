/** @format */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import StatusBar from '../../components/StatusBar'

import colors from '../../styles/colors'

export default function ClientCart(props) {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<Text style={styles.title}>Cliente:</Text>
			<Text style={styles.label}>{props.client.cli_des}</Text>
			<Text style={styles.label}>{`Telefonos: ${props.client.telefonos}`}</Text>
			<Text style={styles.label}>{`Tipo: ${props.client.tipo_precio}`}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	label: {
		fontSize: 15,
	},
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 5,
	},
	btnBuyLabel: {
		fontSize: 18,
	},
	btnBuy: {
		marginTop: 20,
	},
	label1: {
		padding: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	btnDelete: {
		backgroundColor: 'red',
		borderRadius: 5,
		margin: 0,
		width: 60,
		height: 32,
	},
})
