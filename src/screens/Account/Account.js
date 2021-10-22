/** @format */

import React, { useState, useCallback } from 'react'
import { ScrollView, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'
import ScreenLoading from '../../components/ScreenLoading'
import Search from '../../components/Search'
import { getMeApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'

import {
	getTokenApi,
	setTokenApi,
	removeTokenApi,
	getLicenceApi,
} from '../../api/token'

export default function Account() {
	const [user, setUser] = useState(null)
	const { auth } = useAuth()
	const [reloadAccount, setReloadAccount] = useState(false)
	const [displayCurrentAddress, setDisplayCurrentAddress] = useState('')
	const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
	const [isLicencia, setLicencia] = useState(null)

	const validateLicencia = async () => {
		const data = await getLicenceApi()

		if (data) {
			setLicencia(JSON.parse(data))
		} else {
			Alert.alert(
				'Versión Demo',
				'Para exportar los datos debe activar la licencia, dirijase a ACERCA DE',
				[{ text: 'OK' }],
				{ cancelable: false }
			)
		}
	}

	useFocusEffect(
		useCallback(() => {
			setUser(null)
			;(async () => {
				getTokenApi().then((response) => {
					setUser(response)
				})
				//const response = await getTokenApi()
			})()
			validateLicencia()

			setReloadAccount(false)
		}, [reloadAccount])
	)

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			{!user ? (
				<ScreenLoading size='large' />
			) : (
				<>
					<Search />
					<ScrollView>
						<UserInfo user={JSON.parse(user)} />
						<Menu />
					</ScrollView>
				</>
			)}
		</>
	)
}
