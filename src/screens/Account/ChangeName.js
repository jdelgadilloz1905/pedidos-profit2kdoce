/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import StatusBar from '../../components/StatusBar'
import { getMeApi, updateUserApi } from '../../api/user'
import { getTokenApi } from '../../api/token'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'
import { formStyle } from '../../styles'

export default function ChangeName() {
	const { auth, login } = useAuth()
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				//const response = await getMeApi(auth.token)
				const response = await getTokenApi()
				await formik.setFieldValue('name', JSON.parse(response).nombre)
				await formik.setFieldValue('lastname', JSON.parse(response).apellido)
			})()
		}, [])
	)

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)
			try {
				const response = await updateUserApi(auth, formData)
				login(response)
				navigation.goBack()
			} catch (error) {
				Alert.alert('Error al actualizar los datos.', error)
			}
			setLoading(false)
		},
	})

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<View style={styles.container}>
				<TextInput
					label='Nombre'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('name', text)}
					value={formik.values.name}
					error={formik.errors.name}
					autoCapitalize='none'
					autoCapitalize='none'
				/>
				<TextInput
					label='Apellidos'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('lastname', text)}
					value={formik.values.lastname}
					error={formik.errors.lastname}
					autoCapitalize='none'
					autoCapitalize='none'
				/>
				<Button
					mode='contained'
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}>
					Cambiar nombre y apellidos
				</Button>
			</View>
		</>
	)
}

function initialValues() {
	return {
		name: '',
		lastname: '',
	}
}

function validationSchema() {
	return {
		name: Yup.string().required(true),
		lastname: Yup.string().required(true),
	}
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
	},
})
