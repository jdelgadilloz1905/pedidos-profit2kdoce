/** @format */

import React, { useState } from 'react'
import {
	ScrollView,
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Card, Paragraph, TextInput } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import StatusBar from '../../components/StatusBar'

import ScreenLoading from '../../components/ScreenLoading'
import colors from '../../styles/colors'

export default function Report() {
	const navigation = useNavigation()
	const [resultado, setResultado] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [isVisible, setVisible] = useState(false)
	const [value, setsetValue] = useState(null)

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date) => {
		hideDatePicker()
	}

	const handleShowPedidos = () => {
		console.log('busco los pedidos')
	}
	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />

			{!resultado ? (
				<ScreenLoading text='Cargando' size='large' />
			) : (
				<>
					<View>
						<Text>
							<TextInput
								label='Desde'
								value={value}
								editable={false} // optional
							/>
							<TouchableOpacity
								activeOpaticy={1}
								onPress={() => setVisible(true)}></TouchableOpacity>
							<DateTimePickerModal
								isVisible={isVisible}
								onConfirm={(date) => {
									setVisible(false) // <- first thing
									setValue(parseDate(date))
								}}
								onCancel={() => setVisible(false)}
							/>
						</Text>
					</View>
				</>
			)}
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		padding: 10,
		justifyContent: 'center',
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
	itemStyle: {
		justifyContent: 'flex-start',
	},
})
