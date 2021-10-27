/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Alert, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Button, Avatar, Card, Paragraph, List } from 'react-native-paper'
import Cobros from './CuentaxCobrar'
import Documentos from '../../components/Client/Documentos'
import StatusBar from '../../components/StatusBar'
import SearchClient from '../../components/Search/indexClient'
import ScreenLoading from '../../components/ScreenLoading'
import { getClientCartApi, addClientCartApi } from '../../api/cart'
import {
	getCuentaxCobrar,
	getObtenerNotasEntrega,
	getObtenerCobrosCliente,
} from '../../api/client'

import colors from '../../styles/colors'

export default function DetailClient(props) {
	const [client, setClient] = useState(props.route.params.infoClient)
	const [isAddCart, setIsAddCart] = useState(true) //validar si hay un cliente seleccionado
	const [expanded, setExpanded] = React.useState(true)
	const [cuentaXcobrar, setCuentaXcobrar] = useState(null)
	const [isNotaEntrega, setNotaEntrega] = useState(null)
	const [isCobros, setCobros] = useState(null)

	const handlePress = () => setExpanded(!expanded)

	const [reloadClients, setReloadClients] = useState(false)
	const navigation = useNavigation()
	const LeftContent = (props) => (
		<Avatar.Icon
			{...props}
			icon='card-account-details'
			backgroundColor={colors.bgBlue}
		/>
	)
	useFocusEffect(
		useCallback(() => {
			;(async () => {
				const response = await getClientCartApi()
				if (response) {
					setIsAddCart(response)
					setIsAddCart(false)
				} else {
					setIsAddCart(true)
				}

				const responseCxC = await getCuentaxCobrar(client.co_cli)

				if (responseCxC.statusCode === 200)
					setCuentaXcobrar(responseCxC.infoFacturaPendiente)

				const responseNE = await getObtenerNotasEntrega(client.co_cli)
				if (responseNE.statusCode === 200)
					setNotaEntrega(responseNE.infoNotaEntrega)

				const responseCobros = await getObtenerCobrosCliente(client.co_cli)
				if (responseCobros.statusCode === 200)
					setCobros(responseCobros.infoCobros)
			})()

			setReloadClients(false)
		}, [reloadClients])
	)

	const addClientCart = async () => {
		const response = await addClientCartApi(client)
		if (response) {
			setIsAddCart(null)
			navigation.navigate('home')
		} else {
			Alert.alert('ERROR al añadir el cliente, consulte con el Administrador')
		}
	}

	const infoClienteAdmin = () => {
		return (
			<List.Section title='Datos Administrativo'>
				<List.Accordion
					title='Facturas Pendiente'
					left={(props) => <List.Icon {...props} icon='folder' />}>
					<Documentos
						datos={cuentaXcobrar}
						title={'No tiene Factura pendiente'}
					/>
				</List.Accordion>

				<List.Accordion
					title='Notas de Entrega'
					left={(props) => <List.Icon {...props} icon='folder' />}>
					<Documentos
						datos={isNotaEntrega}
						title={'No tiene Notas de Entrega'}
					/>
				</List.Accordion>
				<List.Accordion
					title='Cobros'
					left={(props) => <List.Icon {...props} icon='folder' />}>
					<Cobros datos={isCobros} title={'Cobros'} />
				</List.Accordion>
			</List.Section>
		)
	}

	const infoCuentasxCobrar = () => {
		return
	}
	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<SearchClient />
			{!client ? (
				<ScreenLoading text='Cargando' size='large' />
			) : (
				<>
					<ScrollView contentContainerStyle={styles.container}>
						<Card>
							<Card.Title
								title={client.cli_des}
								subtitle={client.rif}
								left={LeftContent}
							/>
							<Card.Content>
								<Paragraph>Código: {client.co_cli}</Paragraph>
								<Paragraph>Dirección: {client.direc1}</Paragraph>
								<Paragraph>Teléfonos: {client.telefonos}</Paragraph>
								<Paragraph>Tipo de Precio: {client.tipo_precio}</Paragraph>
							</Card.Content>
							{!isCobros ? (
								<Card.Actions>
									<View style={styles.btnsContainer}>
										<Button
											mode='contained'
											contentStyle={styles.btnBuyContent}
											labelStyle={styles.btnLabel}
											style={styles.btn}
											onPress={addClientCart}>
											{isAddCart ? 'Añadir al pedido' : 'Cambiar cliente'}
										</Button>
									</View>
								</Card.Actions>
							) : (
								<></>
							)}
						</Card>
						{infoClienteAdmin()}
					</ScrollView>
				</>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 20,
	},
	label: {
		fontSize: 15,
		marginBottom: 20,
	},
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 2,
	},
	btnLabel: {
		fontSize: 12,
	},
	btnBuy: {
		marginTop: 20,
	},
	label1: {
		padding: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	btnsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		width: '100%',
	},
})
