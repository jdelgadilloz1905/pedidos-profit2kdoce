/** @format */

import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'
import { size } from 'lodash'

import ListProduct from '../../components/Home/ListProduct'

export default function FavoriteList(props) {
	const { products, auth, setReloadFavorite } = props

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mis Favoritos</Text>
			<Text>{`Encontrados: ${size(products)}`} </Text>
			<ListProduct products={products} />
		</View>
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
})
