/** @format */

import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Button, Avatar, Card, Paragraph } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StatusBar from '../../components/StatusBar'
import Search from '../../components/Search'
import ScreenLoading from '../../components/ScreenLoading'

import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'
import { getProductApi } from '../../api/product'
import colors from '../../styles/colors'
import { PRECIOS, UNIDAD, STOCK } from '../../utils/constants'

import { filter } from 'lodash'

export default function Product(props) {
	const [product, setProduct] = useState(
		props.route.params.infoProduct !== undefined
			? props.route.params.infoProduct
			: props.route.params.params.infoProduct
	)

	const [quantity, setQuantity] = useState('1')
	const [isShowMessage, setIsShowMessage] = useState(false) //verifico si el true lo agrego al carrito
	const [isSelectedPrice, setSelectedPrice] = useState(null)
	const [isSelectedUnidad, setSelectedUnidad] = useState(null)
	const [isSelectedStock, setSelectedStock] = useState(null)
	const [reloadProducts, setReloadProducts] = useState(false)

	const [isPrecio, setPrecio] = useState(null)

	const buscarPreciosArt = async (item) => {
		/*Busco el precio del producto */
		const precios = await AsyncStorage.getItem(PRECIOS)
		const datosPrecio = JSON.parse(precios)
		const newListPre = filter(datosPrecio, (product) => {
			return product.co_art.toLowerCase().indexOf(item.toLowerCase()) > -1
		})

		if (newListPre.length !== 0) {
			//recorro y armo el objeto con la lista de precio
			let listaPrecio = []
			newListPre.map(function (a, index) {
				listaPrecio[index] = {
					label: `Precio ${a.co_precio.replace(/ /g, '')}  ->  ${parseFloat(
						a.monto
					).toFixed(2)} $`,
					value: parseFloat(a.monto).toFixed(2),
				}
			})

			await setSelectedPrice(listaPrecio)
		}
	}

	const buscarStockArt = async (item) => {
		/*Busco el stock del producto */

		const stock = await AsyncStorage.getItem(STOCK)
		const datosStock = JSON.parse(stock)

		const newListSto = filter(datosStock, (product) => {
			return product.co_art.toLowerCase().indexOf(item.toLowerCase()) > -1
		})

		if (newListSto.length !== 0) {
			await setSelectedStock(newListSto)
		}
	}

	const listarPrecios = () => {
		if (isSelectedPrice) {
			return <Price prices={isSelectedPrice} setSelectedPrice={setPrecio} />
		} else {
			return <Text>Producto sin precio</Text>
		}
	}

	useFocusEffect(
		useCallback(() => {
			buscarPreciosArt(product.co_art)
			buscarStockArt(product.co_art)
			setReloadProducts(false)
		}, [reloadProducts])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<Search />
			{!product ? (
				<ScreenLoading text='Cargando producto' size='large' />
			) : (
				<ScrollView contentContainerStyle={styles.container}>
					<Card>
						<Card.Title title={`Codigo: ${product.co_art}`} />
						<Card.Content>
							<Paragraph>
								<Text
									style={[
										styles.label,
										styles.title,
									]}>{`Descripción: ${product.art_des}`}</Text>
							</Paragraph>
							<Paragraph>{`Linea: ${product.lin_des}`}</Paragraph>
							<Paragraph>{`Categoria: ${product.cat_des}`}</Paragraph>
							<Paragraph>{`Color: ${
								product.des_color ? product.des_color : ''
							}`}</Paragraph>
							<Paragraph>{`Stock actual: ${
								isSelectedStock
									? isSelectedStock[0].stock_act !== '.00000'
										? parseInt(isSelectedStock[0].stock_act)
										: 0
									: 0
							}`}</Paragraph>

							<Paragraph>{`Stock comprometido: ${
								isSelectedStock
									? isSelectedStock[0].stock_com !== '.00000'
										? parseInt(isSelectedStock[0].stock_com)
										: 0
									: 0
							}`}</Paragraph>

							<Paragraph>{`Stock por llegar: ${
								isSelectedStock
									? isSelectedStock[0].stock_lle !== '.00000'
										? parseInt(isSelectedStock[0].stock_lle)
										: 0
									: 0
							}`}</Paragraph>

							<Paragraph>{`Ubicación: ${product.des_ubicacion}`}</Paragraph>
						</Card.Content>
					</Card>
					{listarPrecios()}

					{/*<CarouselImages images={images} />*/}

					<View style={styles.container}>
						<View style={styles.row}>
							{/* <View style={[styles.box, styles.two]}>
								<Quantity
									quantity={quantity}
									setQuantity={setQuantity}
									setIsShowMessage={setIsShowMessage}
									isShowMessage={isShowMessage}
									stock_act={isSelectedStock[0].stock_act}
								/>
							</View> */}
							{/* <View style={[styles.box, styles.box2]}>
								<Buy
									product={product}
									quantity={quantity}
									isShowMessage={isShowMessage}
									stock_act={isSelectedStock[0].stock_act}
									price={isPrecio}
								/>
							</View> */}
							{/* <View style={[styles.box, styles.box2]}>
								<Favorite product={product} />
							</View> */}
						</View>
					</View>
				</ScrollView>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingBottom: 50,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 15,
		marginBottom: 20,
	},
	label: {
		fontSize: 15,
		marginBottom: 20,
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
	containerBtn: {
		flex: 1,
		flexDirection: 'row',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	box: {
		flex: 1,
	},
	box2: {
		marginLeft: 20,
	},
	box3: {
		backgroundColor: 'orange',
	},
	two: {
		flex: 2,
	},
})
