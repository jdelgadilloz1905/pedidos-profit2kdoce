/** @format */

import React, { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { TextInput, Button } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import map from 'lodash'
import { registerApi, getVendedorApi } from '../../api/user'
import { formStyle } from '../../styles'

export default function RegisterForm(props) {
	const { setShowLogin } = props
	const [loading, setLoading] = useState(false)
	const [uploading, setUploading] = useState(false)
	const [selectedCodVen, setSelectedCodVen] = useState(null)
	const [vendedores, setVendedores] = useState([])

	const showLogin = () => setShowLogin((prevState) => !prevState)

	useEffect(() => {
		;(async () => {
			const response = await getVendedorApi()
			setVendedores(response.infoVen)
		})()
	}, [])

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)
			setUploading(true)

			if (selectedCodVen !== null) {
				registerApi(formData, selectedCodVen).then((response) => {
					if (response.statusCode === 200) {
						Alert.alert(response.mensaje)
						showLogin()
					} else {
						Alert.alert(response.mensaje)
						setLoading(false)
						setUploading(false)
					}
				})
			} else {
				setLoading(false)
				setUploading(false)
				Alert.alert('Error', 'Debe seleccionar el vendedor', [{ text: 'OK' }], {
					cancelable: false,
				})
			}
		},
	})

	const maybeRenderUploadingOverlay = () => {
		if (uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center',
						},
					]}>
					<ActivityIndicator color='#fff' animating size='large' />
				</View>
			)
		}
	}

	return (
		<View>
			<DropDownPicker
				items={vendedores}
				placeholder='Seleccione el vendedor'
				containerStyle={{ height: 60, marginBottom: 20 }}
				style={{ backgroundColor: '#fafafa' }}
				itemStyle={{
					justifyContent: 'flex-start',
				}}
				dropDownStyle={{ backgroundColor: '#fafafa' }}
				labelStyle={styles.labelStyle}
				onChangeItem={(item) => setSelectedCodVen(item.value)}
			/>
			<TextInput
				label='Email'
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue('email', text)}
				value={formik.values.email}
				error={formik.errors.email}
				autoCapitalize='none'
			/>
			<TextInput
				label='Usuario'
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue('username', text)}
				value={formik.values.username}
				error={formik.errors.username}
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
			<TextInput
				label='Repetir contraseña'
				style={formStyle.input}
				onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
				value={formik.values.repeatPassword}
				error={formik.errors.repeatPassword}
				secureTextEntry
			/>

			<Button
				mode='contained'
				style={formStyle.btnSucces}
				onPress={formik.handleSubmit}
				loading={loading}>
				Registrarse
			</Button>
			<Button
				mode='text'
				style={formStyle.btnText}
				labelStyle={formStyle.btnTextLabel}
				onPress={showLogin}>
				Iniciar Sesión
			</Button>
			{maybeRenderUploadingOverlay()}
		</View>
	)
}

function initialValues() {
	return {
		email: '',
		username: '',
		password: '',
		repeatPassword: '',
	}
}

function validationSchema() {
	return {
		email: Yup.string().email().required(true),
		username: Yup.string().required(true),
		password: Yup.string().required(true),
		repeatPassword: Yup.string()
			.required(true)
			.oneOf([Yup.ref('password')], true),
	}
}
const styles = StyleSheet.create({
	containerStyle: {
		height: 40,
		width: 100,
	},
	itemStyle: {
		justifyContent: 'flex-start',
	},
	dropDownStyle: {
		backgroundColor: '#fafafa',
	},
	dropDownPicker: {
		backgroundColor: '#fafafa',
	},
	labelStyle: {
		color: '#808080',
		fontSize: 16,
	},
})
