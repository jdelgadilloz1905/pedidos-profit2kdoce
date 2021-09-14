/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import { Button, Avatar, Card, Paragraph, Divider } from 'react-native-paper'
import ScreenLoading from '../../components/ScreenLoading'
import { getTasa } from '../../api/Business'
import { getTasaApi } from '../../api/product'

import StatusBar from '../../components/StatusBar'

import colors from '../../styles/colors'
import { formStyle } from '../../styles'

export default function Business() {
	const [business, setBusiness] = useState(null)
	const [reloadbusiness, setReloadBusiness] = useState(false)
	const [loading, setLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				setReloadBusiness(true)
				const response = await getTasa()

				setBusiness(response)
			})()
		}, [reloadbusiness])
	)

	const LeftContent = (props) => (
		<Avatar.Icon {...props} icon='equal-box' backgroundColor={colors.bgBlue} />
	)
	const handleUpdateTasa = async () => {
		setLoading(true)
		await getTasaApi()
		const response = await getTasa()
		setBusiness(response)
		setLoading(false)
	}
	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<ScrollView style={styles.container}>
				{!business ? (
					<ScreenLoading text='Cargando lista' size='large' />
				) : size(business) === 0 ? (
					<>
						<Text>No se cargaron los datos de la empresa</Text>
						<Text>Contacte con el administrador </Text>
					</>
				) : (
					<Card>
						<Card.Title title='Datos de la Empresa' left={LeftContent} />
						<Card.Content>
							<Paragraph>DISTRIBUIDORA DIAZ HERNANDEZ C.A </Paragraph>
							<Paragraph>J305033900</Paragraph>
							<Paragraph>
								CALLE ROSCIO LOCAL NRO. 13-1 SECTOR CENTRO SAN JUANDE LOS MORROS
								GUARICO
							</Paragraph>
							<Paragraph>Moneda $</Paragraph>

							<Paragraph>Codigo DHHDIV_A</Paragraph>

							<Paragraph>
								Tasa del dia: {parseFloat(business.tasa_v).toFixed(2)} $
							</Paragraph>
							<Paragraph>Ultima actualización: {business.fecha}</Paragraph>

							<Button
								mode='contained'
								style={formStyle.btnSucces}
								onPress={() => handleUpdateTasa()}
								loading={loading}>
								Actualizar
							</Button>
						</Card.Content>
					</Card>
				)}
			</ScrollView>
		</>
	)
}

var styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	title: {
		fontSize: 18,
	},
	addAddress: {
		borderWidth: 0.9,
		borderRadius: 5,
		borderColor: '#ddd',
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	noBusinessText: {
		paddingTop: 18,
		fontSize: 16,
	},
	loading: {
		marginTop: 20,
	},
	espacio: {
		margin: 10,
	},
})
