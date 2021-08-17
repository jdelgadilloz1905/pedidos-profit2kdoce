/** @format */

import React, { useState } from 'react'
import { View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import useAuth from '../../hooks/useAuth'
import { loginApi } from '../../api/user'
import { formStyle } from '../../styles'

export default function LoginForm(props) {
	const { setShowLogin } = props
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()

	const showRegister = () => setShowLogin((prevState) => !prevState)

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)
			try {
				const response = await loginApi(formData)

				if (response.statusCode !== 200) {
					Alert.alert(response.mensaje)
				} else {
					login(response)
				}
				setLoading(false)
				//Alert.alert('Bienvenido')
			} catch (error) {
				Alert.alert(response.mensaje)
				setLoading(false)
			}
		},
	})

	return (
		<View>
			<TextInput
				label='Email o Usuario'
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue('identifier', text)}
				value={formik.values.identifier}
				error={formik.errors.identifier}
				autoCapitalize='none'
			/>
			<TextInput
				label='Contraseña'
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue('password', text)}
				value={formik.values.password}
				error={formik.errors.password}
				secureTextEntry
			/>
			<Button
				mode='contained'
				style={formStyle.btnSucces}
				onPress={formik.handleSubmit}
				loading={loading}>
				Entrar
			</Button>
			<Button
				mode='text'
				style={formStyle.btnText}
				labelStyle={formStyle.btnTextLabel}
				onPress={showRegister}>
				Registrarse
			</Button>
		</View>
	)
}

function initialValues() {
	return {
		identifier: '',
		password: '',
		modo: 'directo',
	}
}

function validationSchema() {
	return {
		identifier: Yup.string().required(true),
		password: Yup.string().required(true),
	}
}
