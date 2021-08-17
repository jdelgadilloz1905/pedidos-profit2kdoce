/** @format */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Favorite from '../screens/Favorites'
import Product from '../screens/Product/Product'

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
				name='favorites'
				component={Favorite}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='product'
				component={Product}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}
