/** @format */

import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
} from 'react-native'
import { map } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { List, IconButton } from 'react-native-paper'

export default function ListProduct(props) {
	const { products } = props
	const navigation = useNavigation()
	const goToProduct = (product) => {
		navigation.push('product', { infoProduct: product })
	}
	const addProductCart = () => {
		console.log('agrego al pedido ')
	}
	return (
		<View style={styles.container}>
			{map(products, (product) => (
				<>
					<TouchableWithoutFeedback
						key={product.co_art}
						onPress={() => goToProduct(product)}>
						<View style={styles.containerProduct}>
							<View style={styles.product}>
								<List.Item
									title={product.art_des}
									description={
										<>
											<Text
												style={
													styles.title
												}>{`Stock: ${product.stock_act}`}</Text>

											{/*<IconButton
												icon='cart'
												color={'green'}
												onPress={addProductCart}
											/>*/}
										</>
									}
									left={(props) => (
										<List.Icon
											{...props}
											icon={product.stock_act > 1 ? 'image' : 'image'} //aqui se debe validar el stock del producto para indicar el icon
										/>
									)}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		margin: -3,
	},
	containerProduct: {
		width: '100%',
		padding: 3,
	},
	product: {
		backgroundColor: '#f0f0f0',
		borderRadius: 15,
	},
	image: {
		height: 80,
		resizeMode: 'contain',
	},
	name: {
		marginTop: 15,
		fontSize: 14,
	},
	title: {
		fontSize: 12,
	},
	title2: {
		fontWeight: 'bold',
		fontSize: 14,
		marginBottom: 20,
	},
})
