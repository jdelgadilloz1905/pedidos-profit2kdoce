/** @format */

import React, { useState } from 'react'
import {
	SafeAreaView,
	View,
	FlatList,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Dimensions,
	ActivityIndicator,
	Alert,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import {
	List,
	IconButton,
	Modal,
	Portal,
	Button,
	Provider,
	TextInput,
} from 'react-native-paper'
import {
	addProductCartApi,
	getClientCartApi,
	getCalculatePrice,
} from '../../api/cart'
import { size } from 'lodash'

import Quantity from '../../components/Product/Quantity'
import colors from '../../styles/colors'

export default function ListProduct(props) {
	const { products } = props
	const navigation = useNavigation()
	const goToProduct = (product) => {
		navigation.push('product', { infoProduct: product })
	}
	const [reloadCart, setReloadCart] = useState(false)

	const { width } = Dimensions.get('window')

	//VENTANA MODAL
	const [visible, setVisible] = useState(false)
	const showModal = () => setVisible(true)
	const hideModal = () => setVisible(false)
	const [quantity, setQuantity] = useState('1')
	const [coArt, setCoArt] = useState('')
	const [item2, setItem2] = useState({})
	const [isShowMessage, setIsShowMessage] = useState(false) //verifico si el true lo agrego al carrito
	const [stockActual, setStockActual] = useState(0)

	const addProductCart = async (item) => {
		setItem2(item)
		setReloadCart(true)
		//VALIDAR SI HA SELECCIONADO UN CLIENTE
		const cliente = await getClientCartApi()
		if (size(cliente) === 0) {
			Alert.alert('ERROR. Seleccione primero el cliente')

			navigation.navigate('client')
		} else {
			//levanto el modal y luego cuando coloque la cantidad es que comienzo a cargar el ReloarCart

			setStockActual(item.stock_act)
			setCoArt(item.co_art)
			setVisible(true)
		}

		setReloadCart(false)
	}

	const addProductCart2 = async () => {
		setReloadCart(true)
		//VALIDAR SI HA SELECCIONADO UN CLIENTE

		const price = await getCalculatePrice(item2)

		const response = await addProductCartApi(
			item2.co_art,
			item2.art_des,
			quantity,
			price,
			item2.stock_act
		)
		if (response) {
			Alert.alert('Producto añadido al pedido')
		} else {
			Alert.alert('ERROR al añadir el producto ')
		}

		setVisible(false)

		setReloadCart(false)
	}
	const renderItem = ({ item }) => (
		<View style={[styles.containerHeader, { width: width }]}>
			<View style={styles.item1}>
				<TouchableWithoutFeedback
					key={item.co_art}
					onPress={() => goToProduct(item)}>
					<View style={styles.containerProduct}>
						<List.Item
							title={`Código: ${item.co_art.trim()}`}
							description={
								<>
									<Text style={styles.title}>{`${item.art_des.trim()}`}</Text>
								</>
							}
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.item2}>
				<IconButton
					icon='cart-outline'
					color={'green'}
					onPress={() => addProductCart(item)}
				/>
			</View>
		</View>
	)
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={products}
				renderItem={renderItem}
				keyExtractor={(item) => item.co_art}
			/>
			{reloadCart && (
				<View style={styles.reload}>
					<ActivityIndicator size='large' color='#fff' />
					<Text style={styles.reloadText}>Agregando al pedido...</Text>
				</View>
			)}
			{visible && (
				<Provider>
					<Portal>
						<Modal
							visible={visible}
							onDismiss={() => hideModal()}
							contentContainerStyle={{
								backgroundColor: 'white',
								padding: 60,
							}}>
							<View style={styles.containerStyle}>
								<Quantity
									quantity={quantity}
									setQuantity={setQuantity}
									setIsShowMessage={setIsShowMessage}
									isShowMessage={isShowMessage}
									stock_act={stockActual}
								/>
								<View style={styles.row}>
									<Button
										mode='contained'
										color={colors.primary}
										onPress={() => addProductCart2()}>
										Agregar
									</Button>
								</View>

								<View style={styles.row}></View>
							</View>
							<Button style={{ marginTop: 10 }} onPress={hideModal}>
								Cerrar
							</Button>
						</Modal>
					</Portal>
				</Provider>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	containerProduct: {
		width: '100%',
	},
	containerHeader: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#f0f0f0',
		margin: 1,
		borderRadius: 10,
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
	item1: {
		flex: 0.8,
	},
	item2: {
		flex: 0.2,
		paddingTop: 5,
	},
	title2: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 5,
	},
	reload: {
		backgroundColor: '#000',
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	reloadText: {
		marginTop: 5,
		color: '#000',
		fontWeight: 'bold',
	},
	containerStyle: {
		backgroundColor: 'white',
		padding: 20,
	},

	row: {
		marginTop: 20,
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
