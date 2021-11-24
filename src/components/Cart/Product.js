/** @format */

import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
import { Button, IconButton } from 'react-native-paper'

import {
	deleteProductCartApi,
	decreaseProductCartApi,
	increaseProductCartApi,
	updateProductCartApi,
	updateProductCartDescuentoApi,
} from '../../api/cart'
import Quantity from '../../components/Product/Quantity'
import colors from '../../styles/colors'
import { MONEDA } from '../../utils/constants'

export default function Product(props) {
	const { product, setReloadCart } = props

	const [quantity, setQuantity] = useState(product.quantity.toString())
	const [isMessage, setIsMessage] = useState('') //verifico si el true lo agrego al carrito
	const [isDecuento, setIsDescuento] = useState('0.00')
	const [isShowMessage, setIsShowMessage] = useState(false)

	const calcPrice = (price, discount) => {
		if (!discount) return parseFloat(price).toFixed(2)

		const discountAmount = (price * discount) / 100
		return (price - discountAmount).toFixed(2)
	}

	const deleteProductCart = async () => {
		const response = await deleteProductCartApi(product.co_art)
		if (response) setReloadCart(true)
	}

	const decreaseProductCart = async () => {
		const response = await decreaseProductCartApi(product.co_art)
		if (response) setReloadCart(true)
	}
	const increaseProductCart = async () => {
		const response = await increaseProductCartApi(product.co_art)
		if (response) setReloadCart(true)
	}

	const updateProductCartDescuento = async (text) => {
		if (/^[0-9]*[.]?[0-9]*$/.test(text.toString())) {
			setIsDescuento(text)
			const response = await updateProductCartDescuentoApi(product.co_art, text)

			if (response) setReloadCart(true)
			setIsDescuento(text)
		} else {
			isShowMessage(true)

			setIsMessage('Error, verifique el número que esta ingresando')
		}
	}
	const updateProductCart = async (item) => {
		const response = await updateProductCartApi(product.co_art, item)
		if (response) setReloadCart(true)
	}

	return (
		<View key={product.co_art} style={styles.product}>
			{/*<View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${product.main_image.url}`,
          }}
        />
      </View>*/}

			<View style={styles.info}>
				<View>
					<Text style={styles.name} numberOfLines={3} ellipsizeMode='tail'>
						{product.art_des}
					</Text>
					<Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
						Codigo: {product.co_art}
					</Text>

					<Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>
						Stock: {product.stock_act}
					</Text>
				</View>
				<View style={styles.btnsContainer}>
					<View style={styles.selectQuantity}>
						{/* <Quantity
							quantity={quantity}
							setQuantity={updateProductCart}
							setIsShowMessage={setIsShowMessage}
							isShowMessage={isShowMessage}
							stock_act={product.stock_act}
						/> */}
						<IconButton
							icon='plus'
							color='#fff'
							size={19}
							style={styles.btnQuantity}
							onPress={increaseProductCart}
						/>
						<TextInput
							value={product.quantity.toString()}
							style={styles.inputQuantity}
						/>
						<IconButton
							icon='minus'
							color='#fff'
							size={19}
							style={styles.btnQuantity}
							onPress={decreaseProductCart}
						/>
					</View>

					<TextInput
						label='Descuento'
						value={isDecuento}
						keyboardType={'numeric'}
						style={styles.inputQuantity2}
						onChangeText={(text) => updateProductCartDescuento(text)}
					/>
					{isShowMessage && <Text style={styles.label}>{isMessage}</Text>}
					<Button color='#b12704' icon='delete' onPress={deleteProductCart} />
				</View>

				<View style={styles.container}>
					<View style={styles.row}>
						<View style={[styles.box, styles.two]}>
							<Text style={styles.currentPrice}>
								{`Precio: ${calcPrice(
									product.price,
									parseFloat(product.descuento)
								)} ${MONEDA}`}
							</Text>
						</View>
						<View style={[styles.box, styles.two]}>
							<Text style={styles.currentPrice}>% Descuento</Text>
						</View>
						<View>
							<Text style={styles.currentPrice}>
								{`Total: ${calcPrice(
									product.price * product.quantity,
									parseFloat(product.descuento)
								)} ${MONEDA}`}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	product: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#dadde1',
	},
	containerImage: {
		width: '40%',
		height: 170,
		backgroundColor: '#ebebeb',
		padding: 5,
	},
	image: {
		height: '100%',
		resizeMode: 'contain',
	},
	info: {
		padding: 10,
		width: '100%',
		justifyContent: 'space-between',
	},
	name: {
		fontSize: 14,
	},
	prices: {
		flexDirection: 'row',
		marginTop: 5,
		alignItems: 'flex-end',
	},
	currentPrice: {
		fontSize: 13,
		color: '#b12704',
	},
	btnsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		width: '100%',
	},
	selectQuantity: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnQuantity: {
		backgroundColor: colors.primary,
		borderRadius: 5,
		margin: 0,
	},
	inputQuantity: {
		paddingHorizontal: 10,
		fontSize: 16,
	},
	inputQuantity2: {
		paddingHorizontal: 10,
		fontSize: 16,
		marginRight: 20,
	},
	container: {
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
