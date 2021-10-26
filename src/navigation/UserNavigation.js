/** @format */

import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import colors from '../styles/colors'
import ProductStack from './ProductStack'
import ClientStack from './ClientStack'
import FavoritesScreen from './FavoriteStack'
import CartStack from './CartStack'
import AccountStack from './AccountStack'
import CuentaxCobrarScreen from './CuentaxCobrarStack'

const Tab = createMaterialBottomTabNavigator()

export default function UserNavigation() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='account'
				barStyle={styles.navigation}
				screenOptions={({ route }) => ({
					tabBarIcon: (routeStatus) => {
						return setIcon(route, routeStatus)
					},
				})}>
				<Tab.Screen
					name='client'
					component={ClientStack}
					options={{
						title: 'Clientes',
					}}
				/>
				<Tab.Screen
					name='home'
					component={ProductStack}
					options={{
						title: 'Articulos',
					}}
				/>
				<Tab.Screen
					name='cxc'
					component={CuentaxCobrarScreen}
					options={{
						title: 'CxC',
					}}
				/>
				<Tab.Screen
					name='favorites'
					component={FavoritesScreen}
					options={{
						title: 'Favoritos',
					}}
				/>
				<Tab.Screen
					name='cart'
					component={CartStack}
					options={{
						title: 'Mi Pedido',
					}}
				/>
				<Tab.Screen
					name='account'
					component={AccountStack}
					options={{
						title: 'Mi cuenta',
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

function setIcon(route, routeStatus) {
	let iconName = ''
	switch (route.name) {
		case 'home':
			iconName = 'archive'
			break
		case 'client':
			iconName = 'user'
			break
		case 'favorites':
			iconName = 'heart'
			break
		case 'cxc':
			iconName = 'money'
			break
		case 'cart':
			iconName = 'shopping-cart'
			break
		case 'account':
			iconName = 'bars'
			break
		default:
			break
	}
	return <AwesomeIcon name={iconName} style={[styles.icon]} />
}

const styles = StyleSheet.create({
	navigation: {
		backgroundColor: colors.bgBlue,
	},
	icon: {
		fontSize: 20,
		color: colors.fontLight,
	},
})
