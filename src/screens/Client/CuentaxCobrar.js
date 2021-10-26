/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import StatusBar from '../../components/StatusBar'
import { List } from 'react-native-paper'
import { map } from 'lodash'

import colors from '../../styles/colors'
import { MONEDA } from '../../utils/constants'

export default function Documentos(props) {
	//realizo un useEffect para hacer la busque de las cuentas por cobrar del cliente
	const { datos, title } = props

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			{!datos ? (
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
				</View>
			) : (
				<List.Section>
					{map(datos, (item) => (
						<List.Item
							key={item.id}
							title={`Tipo: ${item.co_tipo_doc}`}
							description={
								<>
									<View style={styles.btnsContainer}>
										<Text>{`Nro Doc: ${item.nro_doc}`}</Text>
										<Text>{`Fecha emisión: ${item.fec_emis.substring(
											0,
											10
										)}`}</Text>
									</View>

									<View style={styles.btnsContainer}>
										<Text>{`Fecha venc.: ${item.fec_venc.substring(
											0,
											10
										)}   `}</Text>
										<Text>{`  Total: ${item.total_neto} ${MONEDA}`}</Text>
									</View>
								</>
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
		fontSize: 12,
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
