/** @format */

import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	ScrollView,
} from 'react-native'
import { map } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '../../utils/constants'
import { List } from 'react-native-paper'

export default function ListClient(props) {
	const { clients } = props
	const navigation = useNavigation()
	const goToClient = (clients) => {
		navigation.push('detail-client', { infoClient: clients })
	}

	return (
		<ScrollView>
			<View>
				{map(clients, (client, index) => (
					<TouchableWithoutFeedback
						key={index}
						onPress={() => goToClient(client)}>
						<View style={styles.containerClient}>
							<View style={styles.client}>
								<List.Item
									title={client.cli_des}
									description={
										<>
											<Text
												style={
													styles.title
												}>{`Direccion: ${client.direc1}`}</Text>
											<Text style={styles.title}>{`Rif: ${client.rif}`}</Text>
											<Text
												style={
													styles.title
												}>{`Telefonos: ${client.telefonos}`}</Text>
										</>
									}
									left={(props) => <List.Icon {...props} icon={'star'} />}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				))}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	containerClient: {
		width: '100%',
		padding: 3,
	},
	client: {
		backgroundColor: '#f0f0f0',
		borderRadius: 15,
	},
	image: {
		height: 80,
		resizeMode: 'contain',
	},
	name: {
		marginTop: 15,
		fontSize: 14,
	},
	title: {
		fontSize: 12,
	},
})
