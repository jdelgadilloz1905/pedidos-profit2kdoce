/** @format */

import React, { useState, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'
import ScreenLoading from '../../components/ScreenLoading'
import Search from '../../components/Search'
import { getMeApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'

import { getTokenApi, setTokenApi, removeTokenApi } from '../../api/token'

export default function Account() {
	const [user, setUser] = useState(null)
	const { auth } = useAuth()
	const [reloadAccount, setReloadAccount] = useState(false)

	useFocusEffect(
		useCallback(() => {
			setUser(null)
			;(async () => {
				const response = await getTokenApi()
				setUser(response)
			})()
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
