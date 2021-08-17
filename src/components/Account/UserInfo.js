/** @format */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Avatar, Card, Paragraph } from 'react-native-paper'
import colors from '../../styles/colors'

export default function UserInfo(props) {
	const { user } = props
	const LeftContent = (props) => (
		<Avatar.Icon
			{...props}
			icon='account-box'
			backgroundColor={colors.bgBlue}
		/>
	)
	return (
		<Card>
			<Card.Title
				title={`${user.nombre} ${user.apellido}`}
				left={LeftContent}
			/>
			<Card.Content>
				<Paragraph>{`Usuario: ${user.usuario}`}</Paragraph>
				<Paragraph>{`Email: ${user.email}`}</Paragraph>
				<Paragraph>{`Vendedor: ${user.co_ven}`}</Paragraph>
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 100,
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
	},
	titleName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})
