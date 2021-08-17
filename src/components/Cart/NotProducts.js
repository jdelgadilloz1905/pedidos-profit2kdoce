/** @format */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function NotProducts(props) {
	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Image
				source={require('../../../assets/no-resultados.jpg')}
				resizeMode='cover'
				style={{ width: 300, height: 300 }}
			/>
			<Text style={styles.searchText}>No se encontraron registro.</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'red',
	},
})
