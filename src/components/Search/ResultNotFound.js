/** @format */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function ResultNotFound(props) {
	const { search } = props

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Image
				source={require('../../../assets/no-resultados.jpg')}
				resizeMode='cover'
				style={{ width: 300, height: 300 }}
			/>
			<Text style={styles.searchText}>No hay resultados para {search}.</Text>
			<Text style={styles.otherText}>
				Revisa la ortigrafía o usa términos más generales.
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	searchText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	otherText: {
		fontSize: 14,
		paddingTop: 5,
	},
})
