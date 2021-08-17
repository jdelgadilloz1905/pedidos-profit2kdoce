/** @format */

import React from 'react'
import {
	SafeAreaView,
	View,
	FlatList,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
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
	const renderItem = ({ item }) => (
		<TouchableWithoutFeedback
			key={item.co_cli}
			onPress={() => goToClient(item)}>
			<View style={styles.containerClient}>
				<View style={styles.client}>
					<List.Item
						title={item.cli_des}
						description={
							<>
								<Text style={styles.title}>{`Código: ${item.co_cli}`}</Text>
								<Text style={styles.title}>{`Rif: ${item.rif}`}</Text>
							</>
						}
						left={(props) => <List.Icon {...props} icon={'star'} />}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={clients}
				renderItem={renderItem}
				keyExtractor={(item) => item.co_cli}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	containerClient: {
		width: '100%',
		padding: 1,
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
