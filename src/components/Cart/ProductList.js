/** @format */

import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { map } from 'lodash'
import ScreenLoading from '../ScreenLoading'
import Product from './Product'
import { getProductApi } from '../../api/product'

export default function ProductList(props) {
	const { cart, products, setProducts, setReloadCart, setTotalPayment } = props

	useEffect(() => {
		;(async () => {
			const productTemp = []
			let totalPaymentTemp = 0
			for await (const product of cart) {
				const response = await getProductApi(product.co_art)

				response.infoProduct.quantity = product.quantity
				response.infoProduct.price = product.price
				productTemp.push(response.infoProduct)
				//totalPaymentTemp += response.infoProduct.prec_vta1 * product.quantity
				totalPaymentTemp +=
					product.price *
					(response.infoProduct.uni_venta === 'UND'
						? product.quantity *
						  (parseInt(response.infoProduct.uni_relac) > 0
								? parseInt(response.infoProduct.uni_relac)
								: 1)
						: product.quantity)
			}

			setProducts(productTemp)
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
