/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import StatusBar from '../../components/StatusBar'
import { getMeApi, updateUserDataApi } from '../../api/user'

import { getTokenApi } from '../../api/token'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'
import { formStyle } from '../../styles'

export default function ChangeEmail() {
	const { auth, login } = useAuth()
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				//const response = await getMeApi(auth.token)
				const response = await getTokenApi()
				await formik.setFieldValue('email', JSON.parse(response).email)
			})()
		}, [])
	)

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)

			try {
				const response = await updateUserDataApi(auth, formData)

				if (response.statusCode === '201') Alert.alert('El email ya existe')
				login(response)
				navigation.goBack()
			} catch (error) {
				Alert.alert(error)

				formik.setFieldError('email', true)
			}
			setLoading(false)
		},
	})

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<View style={styles.container}>
				<TextInput
					label='Email'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('email', text)}
					value={formik.values.email}
					error={formik.errors.email}
					autoCapitalize='none'
				/>
				<Button
					mode='contained'
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}>
					Cambiar email
				</Button>
			</View>
		</>
	)
}

function initialValues() {
	return {
		email: '',
	}
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
	}
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
	},
})
