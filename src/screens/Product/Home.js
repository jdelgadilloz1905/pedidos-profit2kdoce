/** @format */

import React from 'react'
import { ScrollView, View } from 'react-native'
import StatusBar from '../../components/StatusBar'
import Search from '../../components/Search'
import Banners from '../../components/Home/Banners'
import NewProducts from '../../components/Home/NewProducts'
import colors from '../../styles/colors'

export default function Home() {
	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<Search />

			<NewProducts />

			{/*<ScrollView>
				<Banners />
				<NewProducts />
			</ScrollView>*/}
		</>
	)
}
