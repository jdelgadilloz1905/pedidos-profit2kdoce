/** @format */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/Account/Account'
import ChangeName from '../screens/Account/ChangeName'
import ChangeEmail from '../screens/Account/ChangeEmail'
import ChangeLicence from '../screens/Account/ChangeLicence'
import ChangeUsername from '../screens/Account/ChangeUsername'
import ChangePassword from '../screens/Account/ChangePassword'

import Orders from '../screens/Account/Orders'
import DetailOrder from '../screens/Account/DetailOrder'
import Pedidos from '../screens/Account/Pedidos'
import DetailPedido from '../screens/Account/DetailPedido'
import Business from '../screens/Account/Business'

import Search from '../screens/Product/Search'
import Product from '../screens/Product/Product'
import Report from '../screens/Account/Report'
import colors from '../styles/colors'

const Stack = createStackNavigator()

export default function AccountStack() {
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
				name='account'
				component={Account}
				options={{ title: 'Cuenta', headerShown: false }}
			/>
			<Stack.Screen
				name='change-name'
				component={ChangeName}
				options={{
					title: 'Cambiar nombre y apellidos',
				}}
			/>
			<Stack.Screen
				name='change-email'
				component={ChangeEmail}
				options={{
					title: 'Cambiar email',
				}}
			/>
			<Stack.Screen
				name='change-username'
				component={ChangeUsername}
				options={{
					title: 'Cambiar nombre de usuario',
				}}
			/>
			<Stack.Screen
				name='change-password'
				component={ChangePassword}
				options={{
					title: 'Cambiar contraseña',
				}}
			/>

			<Stack.Screen
				name='pedidos'
				component={Pedidos}
				options={{
					title: 'Pedidos No Sincronizados',
				}}
			/>
			{
				<Stack.Screen
					name='detail-pedido'
					component={DetailPedido}
					options={{
						title: 'Detalle del pedido',
					}}
				/>
			}
			<Stack.Screen
				name='orders'
				component={Orders}
				options={{
					title: 'Pedidos Sincronizados',
				}}
			/>
			{
				<Stack.Screen
					name='detail-order'
					component={DetailOrder}
					options={{
						title: 'Detalle del pedido',
					}}
				/>
			}

			<Stack.Screen
				name='business'
				component={Business}
				options={{
					title: 'Datos de la empresa',
				}}
			/>

			<Stack.Screen
				name='search'
				component={Search}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='product'
				component={Product}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='report'
				component={Report}
				options={{
					title: 'Reporte de pedidos',
				}}
			/>

			<Stack.Screen
				name='licence'
				component={ChangeLicence}
				options={{
					title: 'Información del producto y licencia',
				}}
			/>
		</Stack.Navigator>
	)
}
