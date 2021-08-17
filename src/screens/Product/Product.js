/** @format */

import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Button, Avatar, Card, Paragraph } from 'react-native-paper'
import StatusBar from '../../components/StatusBar'
import Search from '../../components/Search'
import ScreenLoading from '../../components/ScreenLoading'

import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'
import { getProductApi } from '../../api/product'
import colors from '../../styles/colors'

export default function Product(props) {
	const [product, setProduct] = useState(
		props.route.params.infoProduct !== undefined
			? props.route.params.infoProduct
			: props.route.params.params.infoProduct
	)
	const [images, setImages] = useState([])
	const [quantity, setQuantity] = useState('1')
	const [isShowMessage, setIsShowMessage] = useState(false) //verifico si el true lo agrego al carrito
	const [selectedPrice, setSelectedPrice] = useState(null)

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
							<Paragraph>{`Color: ${product.des_col}`}</Paragraph>
							<Paragraph>{`Stock: ${product.stock_act}`}</Paragraph>
							<Paragraph>{`Tipo: ${product.uni_venta}`}</Paragraph>
						</Card.Content>
					</Card>

					{/*<CarouselImages images={images} />*/}
					<Price
						prices={[
							{
								label: `Precio 1: ${parseFloat(product.prec_vta1).toFixed(
									2
								)} $`,
								value: product.prec_vta1,
							},
							{
								label: `Precio 2: ${parseFloat(product.prec_vta2).toFixed(
									2
								)} $`,
								value: product.prec_vta2,
							},
							{
								label: `Precio 3: ${parseFloat(product.prec_vta3).toFixed(
									2
								)} $`,
								value: product.prec_vta3,
							},
							{
								label: `Precio 4: ${parseFloat(product.prec_vta4).toFixed(
									2
								)} $`,
								value: product.prec_vta4,
							},
							{
								label: `Precio 5: ${parseFloat(product.prec_vta5).toFixed(
									2
								)} $`,
								value: product.prec_vta5,
							},
						]}
						setSelectedPrice={setSelectedPrice}
					/>
					<View style={styles.container}>
						<View style={styles.row}>
							<View style={[styles.box, styles.two]}>
								<Quantity
									quantity={quantity}
									setQuantity={setQuantity}
									setIsShowMessage={setIsShowMessage}
									isShowMessage={isShowMessage}
									stock_act={product.stock_act}
								/>
							</View>
							<View style={[styles.box, styles.box2]}>
								<Buy
									product={product}
									quantity={quantity}
									isShowMessage={isShowMessage}
									stock_act={product.stock_act}
									price={selectedPrice}
								/>
							</View>
							<View style={[styles.box, styles.box2]}>
								<Favorite product={product} />
							</View>
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
