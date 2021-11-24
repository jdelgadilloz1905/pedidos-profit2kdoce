/** @format */

import React, { useState, useEffect, useCallback } from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	ActivityIndicator,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker'
import StatusBar from '../components/StatusBar'
import NotRecord from '../components/Cart/NotProducts'
import ProductList from '../components/Cart/ProductList'
import Client from '../components/Cart/Client'
import Payment from '../components/Cart/Payment'
import {
	getProductCartApi,
	getClientCartApi,
	getListOptionPedido,
	getFormaPagoCartApi,
	getTransporteCartApi,
} from '../api/cart'

import useAuth from '../hooks/useAuth'
import colors from '../styles/colors'

export default function Cart() {
	const [cart, setCart] = useState(null)
	const [client, setClient] = useState(null)
	const [products, setProducts] = useState(null)

	const [reloadCart, setReloadCart] = useState(false)
	const [totalPayment, setTotalPayment] = useState(null)

	const { auth } = useAuth()

	const [transporte, setTransporte] = useState(null)
	const [condicio, setCondicio] = useState(null)
	const [selectCodtran, setSelectCodtran] = useState([])
	const [selectFormaPago, setSelectFormaPago] = useState([])

	useFocusEffect(
		useCallback(() => {
			setCart(null)
			loadCart()
			loadClient()
			loadPedido()
		}, [])
	)

	useEffect(() => {
		reloadCart && loadCart()
	}, [reloadCart])

	const loadCart = async () => {
		const response = await getProductCartApi()
		setCart(response)
	}

	const loadClient = async () => {
		const response = await getClientCartApi()

		setClient(response)

		setCondicio(response === null ? '' : response.cond_pag)
	}
	const loadPedido = async () => {
		const listTrans = await getTransporteCartApi()
		const listCond = await getFormaPagoCartApi()
		if (!listCond || !listTrans) {
			const response = await getListOptionPedido()
			setSelectCodtran(response.listTrans)
			setSelectFormaPago(response.listCond)
		} else {
			setSelectCodtran(listTrans)
			setSelectFormaPago(listCond)
		}
	}

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			{!client ? (
				<View style={{ alignItems: 'center', paddingTop: 10 }}>
					<Text style={styles.mensaje}>Recuerda seleccionar el cliente</Text>
				</View>
			) : (
				<>
					<Client client={client} />
					<View style={{ padding: 10 }}>
						{/* <DropDownPicker
							items={selectFormaPago}
							placeholder='Forma de pago'
							containerStyle={{ height: 40, marginBottom: 10 }}
							style={{ backgroundColor: '#fafafa' }}
							itemStyle={{
								justifyContent: 'flex-start',
							}}
							dropDownStyle={{ backgroundColor: '#fafafa' }}
							labelStyle={styles.labelStyle}
							onChangeItem={(item) => setCondicio(item.value)}
						/> */}

						<DropDownPicker
							items={selectCodtran}
							placeholder='Transporte'
							containerStyle={{ height: 40, marginBottom: 20 }}
							style={{ backgroundColor: '#fafafa' }}
							itemStyle={{
								justifyContent: 'flex-start',
							}}
							dropDownStyle={{ backgroundColor: '#fafafa' }}
							labelStyle={styles.labelStyle}
							onChangeItem={(item) => setTransporte(item.value)}
						/>
					</View>
				</>
			)}
			{!cart || size(cart) === 0 ? (
				<NotRecord />
			) : (
				<KeyboardAwareScrollView extraScrollHeight={25}>
					<ScrollView style={styles.cartContainer}>
						<Text style={styles.title}>Productos:</Text>
						<ProductList
							cart={cart}
							products={products}
							setProducts={setProducts}
							setReloadCart={setReloadCart}
							setTotalPayment={setTotalPayment}
						/>

						<Payment
							totalPayment={totalPayment}
							products={products}
							client={client}
							formaPago={condicio}
							transporte={transporte}
						/>
					</ScrollView>
					{reloadCart && (
						<View style={styles.reload}>
							<ActivityIndicator size='large' color='#fff' />
							<Text style={styles.reloadText}>Actualizando...</Text>
						</View>
					)}
				</KeyboardAwareScrollView>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	cartContainer: {
		padding: 10,
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
		marginTop: 10,
		color: '#fff',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	mensaje: {
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold',
	},
})
