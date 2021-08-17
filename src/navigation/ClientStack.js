/** @format */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchClient from '../screens/Client/Search'
import Client from '../screens/Client/Client'
import DetailClient from '../screens/Client/DetailClient'
import CuentaxCobrar from '../screens/Client/CuentaxCobrar'

import colors from '../styles/colors'

const Stack = createStackNavigator()

export default function CartStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.fontLight,
				headerStyle: { backgroundColor: colors.bgBlue },
				cardStyle: {
					backgroundColor: '#fff',
				},
			}}>
			<Stack.Screen
				name='client'
				component={Client}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='detail-client'
				component={DetailClient}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='cuenta-cobrar'
				component={CuentaxCobrar}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='search-client'
				component={SearchClient}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}
