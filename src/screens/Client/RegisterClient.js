/** @format */

import React, { useState, useEffect } from 'react'
import { View, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { TextInput, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getOptionsClient, registerClientApi } from '../../api/client'
import colors from '../../styles/colors'
import { formStyle, layoutStyle } from '../../styles'
import useAuth from '../../hooks/useAuth'

export default function RegisterClient() {
	const { auth } = useAuth()

	const [loading, setLoading] = useState(false)
	const [uploading, setUploading] = useState(false)

	const [isCondiciones, setCondiciones] = useState([])
	const [isSelectCondicio, setSelectCondicio] = useState(null)

	const [isTipo, setTipo] = useState([])
	const [isSelectTipo, setSelectTipo] = useState(null)

	const [isSegmento, setSegemento] = useState([])
	const [isSelectSegmento, setSelectSegmento] = useState(null)

	useEffect(() => {
		;(async () => {
			const response = await getOptionsClient()
			if (response.statusCode === 200) {
				setTipo(response.infoTipo)
				setCondiciones(response.infoCondiciones)
				setSegemento(response.infoSegmento)
			}
		})()
	}, [])

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)
			setUploading(true)
			try {
				
				response = await registerClientApi(
					formData,
					isSelectCondicio,
					isSelectTipo,
					isSelectSegmento,
					auth
				)

				if (response.statusCode === 200) Alert.alert(response.mensaje)
			} catch (error) {
				Alert.alert('Error al registrar el cliente ', JSON.stringify(error))
			}
			setLoading(false)
			setUploading(false)
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
		} else {
			return (
				<>
					<DropDownPicker
						items={isTipo}
						placeholder='Tipo'
						containerStyle={{ height: 60, marginBottom: 20 }}
						style={{ backgroundColor: '#fafafa' }}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						labelStyle={styles.labelStyle}
						onChangeItem={(item) => setSelectTipo(item.value)}
					/>
					<DropDownPicker
						items={isCondiciones}
						placeholder='Cond. de pago'
						containerStyle={{ height: 60, marginBottom: 20 }}
						style={{ backgroundColor: '#fafafa' }}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						labelStyle={styles.labelStyle}
						onChangeItem={(item) => setSelectCondicio(item.value)}
					/>
					<DropDownPicker
						items={isSegmento}
						placeholder='Segmento'
						containerStyle={{ height: 60, marginBottom: 20 }}
						style={{ backgroundColor: '#fafafa' }}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						labelStyle={styles.labelStyle}
						onChangeItem={(item) => setSelectSegmento(item.value)}
					/>
				</>
			)
		}
	}

	return (
		<KeyboardAwareScrollView>
			<View style={layoutStyle.container}>
				<View style={styles.containerAuth}>
					<Text style={styles.titleRegister}>Crear Cliente</Text>
				</View>
				<TextInput
					label='Nombre'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('nombre', text)}
					value={formik.values.nombre}
					error={formik.errors.nombre}
					autoCapitalize='none'
				/>
				{maybeRenderUploadingOverlay()}
				<TextInput
					label='Rif'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('rif', text)}
					value={formik.values.rif}
					error={formik.errors.rif}
					autoCapitalize='none'
				/>
				<TextInput
					label='Dirección'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('direccion', text)}
					value={formik.values.direccion}
					error={formik.errors.direccion}
					autoCapitalize='none'
				/>

				<TextInput
					label='Telefono'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('telefono', text)}
					value={formik.values.telefono}
					error={formik.errors.telefono}
					autoCapitalize='none'
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
					label='Responsable'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('responsable', text)}
					value={formik.values.responsable}
					error={formik.errors.responsable}
					autoCapitalize='none'
				/>

				<Button
					mode='contained'
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}>
					Guardar
				</Button>
			</View>
		</KeyboardAwareScrollView>
	)
}

function initialValues() {
	return {
		nombre: '',
		rif: '',
		direccion: '',
		telefono: '',
		email: '',
		responsable: '',
	}
}

function validationSchema() {
	return {
		nombre: Yup.string().required(true),
		rif: Yup.string().required(true),
		direccion: Yup.string().required(true),
		telefono: Yup.string().required(true),
		email: Yup.string().email().required(true),
		responsable: Yup.string().required(true),
	}
}
const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
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
	titleRegister: {
		fontSize: 20,
		paddingBottom: 20,
		color: colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerAuth: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
