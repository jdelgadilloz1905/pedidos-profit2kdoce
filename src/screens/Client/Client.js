/** @format */

import React from 'react'
import { ScrollView } from 'react-native'
import StatusBar from '../../components/StatusBar'
import SearchClient from '../../components/Search/SearchClient'
import NewClients from '../../components/Client/NewClients'
import colors from '../../styles/colors'

export default function Client() {
	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<SearchClient />
			{/* <ScrollView>
				<NewClients />
			</ScrollView> */}
			<NewClients />
		</>
	)
}
