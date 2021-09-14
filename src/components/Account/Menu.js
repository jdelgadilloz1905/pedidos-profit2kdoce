/** @format */

import React from 'react'
import { Alert } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'

export default function Menu() {
	const navigation = useNavigation()
	const { logout } = useAuth()

	const logoutAccount = () => {
		Alert.alert(
			'CERRAR SESION',
			'¿Estas seguro de que quieres salir de tu cuenta?',
			[
				{
					text: 'NO',
				},
				{ text: 'SI', onPress: logout },
			],
			{ cancelable: false }
		)
	}

	return (
		<>
			<List.Section>
				<List.Subheader>Mi cuenta</List.Subheader>
				<List.Item
					title='Cambiar nombre'
					description='Cambia el nombre de tu cuenta'
					left={(props) => <List.Icon {...props} icon='face' />}
					onPress={() => navigation.navigate('change-name')}
				/>
				<List.Item
					title='Cambiar email'
					description='Cambia el email de tu cuenta'
					left={(props) => <List.Icon {...props} icon='at' />}
					onPress={() => navigation.navigate('change-email')}
				/>
				<List.Item
					title='Cambiar usuario'
					description='Cambia el nombre de usuario de tu cuenta'
					left={(props) => <List.Icon {...props} icon='sim' />}
					onPress={() => navigation.navigate('change-username')}
				/>
				<List.Item
					title='Cambiar contraseña'
					description='Cambia el contraseña de tu cuenta'
					left={(props) => <List.Icon {...props} icon='key' />}
					onPress={() => navigation.navigate('change-password')}
				/>
				{/*<List.Item
					title='Mis direcciones'
					description='Administra tus direcciones de envio'
					left={(props) => <List.Icon {...props} icon='map' />}
					onPress={() => navigation.navigate('addresses')}
				/>*/}
			</List.Section>

			<List.Section>
				<List.Subheader>App</List.Subheader>
				<List.Item
					title='Pedidos no sincronizados'
					description='Listado de pedidos que no han sido enviado a profit'
					left={(props) => (
						<List.Icon {...props} icon='clipboard-list-outline' />
					)}
					onPress={() => navigation.navigate('pedidos')}
				/>
				<List.Item
					title='Pedidos sincronizados'
					description='Listado de pedidos enviados a profit'
					left={(props) => <List.Icon {...props} icon='clipboard-list' />}
					onPress={() => navigation.navigate('orders')}
				/>
				<List.Item
					title='Datos de la empresa'
					description='Nombre de la empresa, tasa y base de datos'
					left={(props) => <List.Icon {...props} icon='lock' />}
					onPress={() => navigation.navigate('business')}
				/>
				<List.Item
					title='Mis productos favoritos'
					description='Listado de todos los productos para crear un pedido'
					left={(props) => <List.Icon {...props} icon='heart' />}
					onPress={() => navigation.navigate('favorites')}
				/>
				<List.Item
					title='Reportes'
					description='Consultar pedidos directo en profit'
					left={(props) => <List.Icon {...props} icon='file-document' />}
					onPress={() => navigation.navigate('report')}
				/>

				<List.Item
					title='Acerca de'
					description='Información del producto y licencia'
					left={(props) => <List.Icon {...props} icon='help-circle' />}
					onPress={() => navigation.navigate('licence')}
				/>
				<List.Item
					title='Cerrar sesión'
					description='Cierra esta sesion e inicia con otra'
					left={(props) => <List.Icon {...props} icon='logout' />}
					onPress={logoutAccount}
				/>
			</List.Section>
		</>
	)
}
