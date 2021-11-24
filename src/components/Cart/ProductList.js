/** @format */

import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { map, filter } from 'lodash'
import ScreenLoading from '../ScreenLoading'
import Product from './Product'
import { getProductApi } from '../../api/product'
import { STOCK } from '../../utils/constants'

export default function ProductList(props) {
	const { cart, products, setProducts, setReloadCart, setTotalPayment } = props

	const buscarStockArt = async (item) => {
		/*Busco el stock del producto */

		const stock = await AsyncStorage.getItem(STOCK)
		const datosStock = JSON.parse(stock)

		const newListSto = filter(datosStock, (product) => {
			return product.co_art.toLowerCase().indexOf(item.toLowerCase()) > -1
		})

		if (newListSto.length !== 0) {
			return parseInt(newListSto[0].stock_act)
		}
	}

	useEffect(() => {
		;(async () => {
			const productTemp = []
			const responseCar = {}
			let totalPaymentTemp = 0
			for await (const product of cart) {
				if (product.descuento === '') {
					totalPaymentTemp += product.price * product.quantity
				} else {
					totalPaymentTemp +=
						(product.price -
							(product.price * parseFloat(product.descuento)) / 100) *
						product.quantity
				}

				// responseCar.quantity = product.quantity
				// responseCar.price = product.price
				// responseCar.co_art = product.co_art
				// responseCar.art_des = product.art_des
				// responseCar.stock = stockActual
				// let stockActual = await buscarStockArt(product.co_art)

				// productTemp.push(responseCar)

				//esto aplica cuando se maneja multiples unidades y ver cual es la principal
				// const response = await getProductApi(product.co_art)
				// console.log(response)
				// response.infoProduct.quantity = product.quantity
				// response.infoProduct.price = product.price
				// productTemp.push(response.infoProduct)
				// totalPaymentTemp +=
				// 	product.price *
				// 	(response.infoProduct.uni_venta === 'UND'
				// 		? product.quantity *
				// 		  (parseInt(response.infoProduct.uni_relac) > 0
				// 				? parseInt(response.infoProduct.uni_relac)
				// 				: 1)
				// 		: product.quantity)
			}

			setProducts(cart)
			setTotalPayment(totalPaymentTemp.toFixed(2))
			setReloadCart(false)
		})()
	}, [cart])

	return (
		<View>
			{!products ? (
				<ScreenLoading text='Cargando carrito' size='large' />
			) : (
				map(products, (product) => (
					<Product
						key={product.co_art}
						product={product}
						setReloadCart={setReloadCart}
					/>
				))
			)}
		</View>
	)
}
