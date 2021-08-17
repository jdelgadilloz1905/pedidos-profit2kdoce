/** @format */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function Price(props) {
	const { prices, setSelectedPrice } = props

	return (
		<View style={styles.conatinerData}>
			<DropDownPicker
				items={prices}
				placeholder='Seleccione el precio'
				containerStyle={{ height: 50, marginBottom: 20 }}
				style={{ backgroundColor: '#fafafa' }}
				itemStyle={{
					justifyContent: 'flex-start',
				}}
				dropDownStyle={{ backgroundColor: '#fafafa' }}
				labelStyle={styles.labelStyle}
				onChangeItem={(item) => setSelectedPrice(item.value)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	conatinerData: {
		paddingTop: 10,
	},
	dataText: {
		width: '45%',
		fontSize: 18,
		color: '#747474',
		textAlign: 'right',
	},
	labelStyle: {
		color: '#808080',
		fontSize: 14,
	},
})
