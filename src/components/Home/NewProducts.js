/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, LogBox } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { size } from 'lodash'

import ListProduct from './ListProduct'
import StatusBar from '../StatusBar'
import ScreenLoading from '../ScreenLoading'
import colors from '../../styles/colors'

import {
	getLastProuctsApi,
	getAllProductsApi,
	getStockProducto,
	getUnidadProducto,
	getPrecioProducto,
} from '../../api/product'

export default function NewProducts() {
	const [products, setProducts] = useState(null)
	const [reloadProducts, setReloadProducts] = useState(false)

	useFocusEffect(
		useCallback(() => {
			LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
			setProducts(null)
			;(async () => {
				const responseProduct = await getLastProuctsApi()
				setProducts(responseProduct)
				await getStockProducto()
				await getUnidadProducto()
				await getPrecioProducto()
			})()

			setReloadProducts(false)
		}, [reloadProducts])
	)

	const addUpdateArticulos = async () => {
		setReloadProducts(true)
		Alert.alert(
			'ACTUALIZAR ARTICULOS',
			'¿Estas de acuerdo en actualizar la tabla articulos ?',
			[
				{
					text: 'NO',
				},
				{ text: 'SI', onPress: handleUpdateArticulos },
			],
			{ cancelable: false }
		)
		setReloadProducts(false)
	}

	const handleUpdateArticulos = async () => {
		setProducts(null)
		const response = await getAllProductsApi()

		setProducts(response)
	}

	const handleButton = () => {
		return (
			<Button
				mode='contained'
				contentStyle={styles.btnBuyContent}
				labelStyle={styles.btnLabel}
				style={styles.btn}
				loading={reloadProducts}
				onPress={addUpdateArticulos}>
				Actualizar
			</Button>
		)
	}

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			{!products ? (
				<ScreenLoading text='Cargando lista' size='large' />
			) : size(products) === 0 ? (
				<View style={styles.container}>
					<Text style={styles.title}>Lista de Productos</Text>
					<Text>No se encontraron registros</Text>
					{handleButton()}
				</View>
			) : (
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.container}>
						<View style={styles.row}>
							<View style={[styles.box, styles.two]}>
								<Text style={styles.title}>Lista de Productos</Text>
							</View>
						</View>
						{handleButton()}
						<Text>{`Encontrados: ${size(products)}`} </Text>

						<ListProduct products={products} />
					</View>
				</ScrollView>
			)}
		</>
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
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
	},
	box: {
		flex: 1,
	},
	box2: {
		marginLeft: 10,
	},
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 2,
	},
	btnLabel: {
		fontSize: 12,
	},
	btn: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		margin: 0,
	},
})
