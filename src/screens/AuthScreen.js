/** @format */

import React, { useState } from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import logo from '../../assets/logo.png'
import colors from '../styles/colors'
import { layoutStyle } from '../styles'

export default function LoginScreen() {
	const [showLogin, setShowLogin] = useState(true)

	return (
		<View style={layoutStyle.container}>
			<Image style={styles.logo} source={logo} />
			<View style={styles.containerAuth}>
				<Text style={styles.title}>
					{showLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
				</Text>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				enabled>
				{showLogin ? (
					<LoginForm setShowLogin={setShowLogin} />
				) : (
					<RegisterForm setShowLogin={setShowLogin} />
				)}
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	containerAuth: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: '90%',
		height: '25%',
		resizeMode: 'contain',
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		paddingBottom: 20,
		color: colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
