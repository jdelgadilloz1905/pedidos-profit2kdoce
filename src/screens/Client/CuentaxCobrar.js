/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import StatusBar from '../../components/StatusBar'
import { List } from 'react-native-paper'
import { map } from 'lodash'
import { getCuentaxCobrar } from '../../api/client'

import colors from '../../styles/colors'

export default function CuentaxCobrar(props) {
	//realizo un useEffect para hacer la busque de las cuentas por cobrar del cliente
	const { client } = props

	const [cuentaXcobrar, setCuentaXcobrar] = useState(null)
	const [reloadCobrar, setReloadCobrar] = useState(false)

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				const response = await getCuentaxCobrar(client.co_cli)

				setCuentaXcobrar(response)
			})()

			setReloadCobrar(false)
		}, [reloadCobrar])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			{!cuentaXcobrar ? (
				<Text style={styles.title}>No tiene deudas</Text>
			) : (
				<List.Section>
					<List.Subheader>Facturas pendiente</List.Subheader>
					{map(cuentaXcobrar, (item) => (
						<List.Item
							key={item.fact_num}
							title={`Factura: ${item.fact_num}`}
							description={
								<Text>{`Fecha emisión: ${item.fec_emis}                               Saldo: ${item.saldo} $`}</Text>
							}
							left={(props) => <List.Icon {...props} icon='file-document' />}
						/>
					))}
				</List.Section>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		padding: 10,
		paddingBottom: 50,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	btnsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		width: '100%',
	},
	selectDivid: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})
