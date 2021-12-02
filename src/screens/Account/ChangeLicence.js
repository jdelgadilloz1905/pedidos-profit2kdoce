/** @format */

import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import {
	TextInput,
	Button,
	Avatar,
	Card,
	Paragraph,
	Divider,
} from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import { validateLicenceApi } from '../../api/user'
import ScreenLoading from '../../components/ScreenLoading'

import { getLicenceApi, removeLicenceApi } from '../../api/token'

import colors from '../../styles/colors'
import { formStyle } from '../../styles'
import { SERIAL_APP } from '../../utils/constants'

export default function ChangeLicence() {
	const [loading, setLoading] = useState(false)
	const [datosLicencia, setDatosLicencia] = useState(null)
	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			;(async () => {
				//const response = await getMeApi(auth.token)
				//const response = await getTokenSerial()
				const data = await getLicenceApi()

				if (data) setDatosLicencia(JSON.parse(data))
				await formik.setFieldValue('serial', SERIAL_APP) //ocuvvblta48izsf8psw1dtt4
			})()
		}, [])
	)

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true)

			try {
				const response = await validateLicenceApi(formData)

				if (response === 400) {
					Alert.alert('Tu licencia se encuentra vencida')
					await removeLicenceApi()
					setDatosLicencia(null)
				}

				if (response === 200) {
					const data = await getLicenceApi()
					setDatosLicencia(JSON.parse(data))
				}

				//navigation.goBack()
			} catch (error) {
				Alert.alert(error)

				formik.setFieldError('serial', true)
			}
			setLoading(false)
		},
	})

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<View style={styles.container}>
				<TextInput
					label='Serial'
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('serial', text)}
					value={formik.values.serial}
					error={formik.errors.serial}
					autoCapitalize='none'
					disabled
				/>
				<Button
					mode='contained'
					style={formStyle.btnSucces}
					onPress={formik.handleSubmit}
					loading={loading}>
					Activar licencia
				</Button>
			</View>
			{datosLicencia !== null ? (
				<Card>
					<Card.Content>
						<Divider style={styles.espacio}></Divider>
						<Paragraph>
							Licencia : {datosLicencia.estatus === '1' ? 'ACTIVA' : 'VENCIDA'}
						</Paragraph>
						<Paragraph>
							Validez de la licencia: {datosLicencia.fecha_fin}
						</Paragraph>

						<Divider style={styles.espacio}></Divider>
						<Paragraph>Versión App: 2.2</Paragraph>

						<Paragraph>Desarrollado Por: Ing. Jorge Delgadillo</Paragraph>
						<Paragraph>Correo: jdelgadilloz1905@gmail.com</Paragraph>
						<Paragraph>Teléfono: 0414-2517231</Paragraph>
					</Card.Content>
				</Card>
			) : (
				<Card>
					<Card.Content>
						<Divider style={styles.espacio}></Divider>
						<Paragraph>Licencia : DEMO</Paragraph>
						<Paragraph>Validez de la licencia: 15 dias</Paragraph>

						<Divider style={styles.espacio}></Divider>
						<Paragraph>Versión App: 2.2</Paragraph>

						<Paragraph>Desarrollado Por: Ing. Jorge Delgadillo</Paragraph>
						<Paragraph>Correo: jdelgadilloz1905@gmail.com</Paragraph>
						<Paragraph>Teléfono: 0414-2517231</Paragraph>
					</Card.Content>
				</Card>
			)}
		</>
	)
}

function initialValues() {
	return {
		serial: '',
	}
}

function validationSchema() {
	return {
		serial: Yup.string().required(true),
	}
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	espacio: {
		margin: 10,
	},
})
