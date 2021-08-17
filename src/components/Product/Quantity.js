/** @format */

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

export default function Quantity(props) {
	const { quantity, setQuantity, setIsShowMessage, isShowMessage, stock_act } =
		props

	const [message, setMessage] = useState('')

	const handleSetQuantity = (text) => {
		if (/^[0-9]*[.]?[0-9]*$/.test(text.toString())) {
			if (parseFloat(text) > parseFloat(stock_act)) {
				setIsShowMessage(true)
				setMessage('Stock insuficiente')
			} else {
				setIsShowMessage(false)
			}
		} else {
			setIsShowMessage(true)
			setMessage('Error, verifique el número que esta ingresando')
		}

		setQuantity(text)
	}

	return (
		<>
			<TextInput
				style={styles.itemStyle}
				returnKeyType='done'
				label='Cantidad'
				value={quantity}
				keyboardType={'numeric'}
				onChangeText={(text) => handleSetQuantity(text)}
			/>
			{isShowMessage && <Text style={styles.label}>{message}</Text>}
		</>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		height: 40,
		width: '100%',
	},
	itemStyle: {
		justifyContent: 'flex-start',
		height: 60,
	},
	dropDownStyle: {
		backgroundColor: '#fafafa',
	},
	dropDownPicker: {
		backgroundColor: '#fafafa',
	},
	labelStyle: {
		color: '#000',
	},
	label: {
		color: 'red',
		fontSize: 12,
	},
})
