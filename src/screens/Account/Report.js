/** @format */

import React, { useState, useEffect } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	LogBox,
	ScrollView,
	ActivityIndicator,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Card, Paragraph, Button } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import ScreenLoading from '../../components/ScreenLoading'
import NoRecord from '../../components/Cart/NotProducts'
import ListOrder from '../../components/Order/ListOrder'
import useAuth from '../../hooks/useAuth'
import { getPedidosApiReport } from '../../api/order'

import colors from '../../styles/colors'

export default function Record() {
	const { auth } = useAuth()
	const [resultado, setResultado] = useState(null)
	const [dateStart, setDateStart] = useState(new Date())
	const [dateEnd, setDateEnd] = useState(new Date())
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		return () => {
			''
		}
	}, [])
	LogBox.ignoreAllLogs()
	/*		//const fechaIni = `${dateStart.getFullYear}-${dateStart.getDate}-${dateStart.getMonth}`
		//const fechaFin = `${dateEnd.getFullYear}-${dateEnd.getDate}-${dateEnd.getMonth}`

		//console.log('datos a enviar ', co_user, fechaIni, fechaFin)*/
	const handleSubmit = async () => {
		setLoading(true)

		const response = await getPedidosApiReport(
			JSON.parse(auth.token).id,
			dateStart,
			dateEnd
		)

		if (response.statusCode === 400) {
			setResultado(0)
		} else {
			setResultado(response.infoOrder)
		}

		setLoading(false)
	}

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			<Card>
				<Card.Title />
				<Card.Content>
					<Paragraph>
						<View style={styles.btnsContainer}>
							<DatePicker
								style={styles.datePickerStyle}
								date={dateStart} // Initial date from state
								mode='date' // The enum of date, datetime and time
								placeholder='select date'
								format='DD-MM-YYYY'
								customStyles={{
									dateIcon: {
										//display: 'none',
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0,
									},
									dateInput: {
										marginLeft: 50,
									},
								}}
								onDateChange={(date) => {
									setDateStart(date)
								}}
							/>
							<DatePicker
								style={styles.datePickerStyle}
								date={dateEnd} // Initial date from state
								mode='date' // The enum of date, datetime and time
								placeholder='select date'
								format='DD-MM-YYYY'
								customStyles={{
									dateIcon: {
										//display: 'none',
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0,
									},
									dateInput: {
										marginLeft: 50,
									},
								}}
								onDateChange={(date) => {
									setDateEnd(date)
								}}
							/>
						</View>
					</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						mode='contained'
						style={styles.btnSucces}
						onPress={handleSubmit}
						loading={loading}>
						Buscar
					</Button>
				</Card.Actions>
			</Card>
			<ScrollView style={styles.container}>
				{!resultado ? (
					<NoRecord />
				) : size(resultado) === 0 ? (
					<NoRecord />
				) : (
					<ListOrder orders={resultado} />
				)}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		padding: 20,
	},
	datePickerStyle: {
		width: 150,
		marginTop: 20,
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
		padding: 40,
	},
	btnSucces: {
		padding: 5,
		backgroundColor: colors.primary,
		width: '100%',
	},
})
