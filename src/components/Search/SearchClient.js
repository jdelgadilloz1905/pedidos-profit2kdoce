/** @format */

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Keyboard, Animated } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import SearchHistory from './SearchHistoryClient'
import {
	AnimatedIcon,
	arrowAnimation,
	inputAnimation,
	inputAnimationWidth,
	animatedTransition,
	animatedTransitionReset,
} from './SearchAnimation'
import { updateSearchHistoryClient } from '../../api/search-client'
import colors from '../../styles/colors'

export default function SearchClient(props) {
	const { currentSearch } = props
	const [searchQuery, setSearchQuery] = useState(currentSearch || '')
	const [showHistory, setShowHistory] = useState(false)
	const [containerHeight, setContainerHeight] = useState(0)
	const onChangeSearch = (query) => setSearchQuery(query)
	const navigation = useNavigation()
	const route = useRoute()

	useEffect(() => {
		if (currentSearch !== searchQuery) setSearchQuery(currentSearch)
	}, [currentSearch])

	const openSearch = () => {
		animatedTransition.start()
		setShowHistory(!showHistory)
	}

	const closeSearch = () => {
		animatedTransitionReset.start()
		Keyboard.dismiss()
		setShowHistory(!showHistory)
	}

	const onSearch = async (reuseSearch) => {
		const isReuse = typeof reuseSearch === 'string'

		closeSearch()
		setSearchQuery('')
		!isReuse && (await updateSearchHistoryClient(searchQuery))

		if (route.name === 'search-client') {
			navigation.push('search-client', {
				search: isReuse ? reuseSearch : searchQuery,
			})
		} else {
			navigation.navigate('search-client', {
				search: isReuse ? reuseSearch : searchQuery,
			})
		}
	}

	return (
		<View
			style={styles.container}
			onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
			<View style={styles.containerInput}>
				<AnimatedIcon
					name='arrow-left'
					size={20}
					style={[styles.backArrow, arrowAnimation]}
					onPress={closeSearch}
				/>

				<Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
					<Searchbar
						placeholder='Busca tu cliente'
						onChangeText={onChangeSearch}
						value={searchQuery}
						onFocus={openSearch}
						onSubmitEditing={onSearch}
					/>
				</Animated.View>
			</View>
			{/*
				<SearchHistory
					showHistory={showHistory}
					containerHeight={containerHeight}
					onSearch={onSearch}
				/>*/}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bgBlue,
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 1,
	},
	containerInput: {
		position: 'relative',
		alignItems: 'flex-end',
	},
	backArrow: {
		position: 'absolute',
		left: 0,
		top: 15,
		color: colors.fontLight,
	},
})
