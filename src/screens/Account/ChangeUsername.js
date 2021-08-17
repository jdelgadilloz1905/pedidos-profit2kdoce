/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import StatusBar from '../../components/StatusBar'
import { updateUserNameApi } from '../../api/user'
import { getTokenApi } from '../../api/token'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'
import { formStyle } from '../../styles'

export default function ChangeUsername() {
	const { auth, login } = useAuth()
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				//const response = await getMeApi(auth.token)
				const response = await getTokenApi()
				await formik.setFieldValue('username', JSON.parse(response).usuario)
			})()
		}, [])
	)

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)
			try {
				const response = await updateUserNameApi(auth, formData)
				if (response.statusCode === 400)
					Alert.alert('Error actualizando el usuario')

				if (response.statusCode === 201)
					Alert.alert('El nombre de usuario ya existe')

				login(response)
				navigation.goBack()
			} catch (error) {
				Alert.alert(error)
				formik.setFieldError('username', true)
			}
			setLoading(false)
		},
	})

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<View style={styles.container}>
				<TextInput
					label='Nombre de usuario'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('username', text)}
					value={formik.values.username}
					error={formik.errors.username}
					autoCapitalize='none'
				/>
				<Button
					mode='contained'
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}>
					Cambiar nombre de usuario
				</Button>
			</View>
		</>
	)
}

function initialValues() {
	return {
		username: '',
	}
}

function validationSchema() {
	return {
		username: Yup.string().min(4).required(true),
	}
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
	},
})
