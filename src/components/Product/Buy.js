/** @format */

import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { addProductCartApi, getClientCartApi } from '../../api/cart'

import { size } from 'lodash'

export default function Actions(props) {
	const { product, quantity, isShowMessage, stock_act, price } = props
	const navigation = useNavigation()
	const addProductCart = async () => {
		if (price !== null) {
			if (parseFloat(price) > 0) {
				if (!isShowMessage) {
					if (parseFloat(quantity) > parseFloat(stock_act)) {
						Alert.alert('Stock insuficiente')
					} else {
						//VALIDAR SI HA SELECCIONADO UN CLIENTE
						const cliente = await getClientCartApi()
						if (size(cliente) === 0) {
							Alert.alert('ERROR. Seleccione primero el cliente')
							navigation.navigate('client')
						} else {
							const response = await addProductCartApi(
								product.co_art,
								product.art_des,
								quantity,
								price,
								stock_act
							)
							if (response) {
								Alert.alert('Producto añadido al pedido')
							} else {
								Alert.alert('ERROR al añadir el producto')
							}
						}
					}
				} else {
					Alert.alert('Error, valide el número que esta ingresando')
				}
			} else {
				Alert.alert('Error, Debe seleccionar un precio mayor a cero')
			}
		} else {
			Alert.alert('Error, seleccione un precio')
		}
	}

	return (
		<IconButton
			icon='cart'
			color={'green'}
			size={30}
			onPress={addProductCart}
		/>
	)
}

const styles = StyleSheet.create({
	btnLabel: {
		fontSize: 18,
	},
	btn: {
		marginTop: 20,
	},
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 5,
	},
})
