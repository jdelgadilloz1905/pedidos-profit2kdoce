/** @format */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchClient from '../screens/Client/Search'
import Documentos from '../screens/Documentos'
import DetailClient from '../screens/Client/DetailClient'
import RegisterClient from '../screens/Client/RegisterClient'

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
				name='cxc'
				component={Documentos}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='detail-client'
				component={DetailClient}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name='search-client'
				component={SearchClient}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='create-client'
				component={RegisterClient}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}
