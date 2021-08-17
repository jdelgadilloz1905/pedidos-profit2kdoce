/** @format */

import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { size } from 'lodash'
import useAuth from '../../hooks/useAuth'
import {
	addFavoriteApi,
	isFavoriteApi,
	deleteFavoriteApi,
} from '../../api/favorite'

export default function Actions(props) {
	const { product } = props
	const { auth } = useAuth()
	const [isFavorite, setIsFavorite] = useState(undefined)
	const [loading, setLoading] = useState(false)
	const [reloadFavorite, setReloadFavorite] = useState(false)

	useEffect(() => {
		;(async () => {
			const response = await isFavoriteApi(
				JSON.parse(auth.token).id,
				product.co_art
			)
			if (size(response) === 0) setIsFavorite(false)
			else setIsFavorite(true)

			setReloadFavorite(false)
			setLoading(false)
		})()
	}, [product, reloadFavorite])

	const addFavorite = async () => {
		if (!loading) {
			setLoading(true)
			await addFavoriteApi(JSON.parse(auth.token).id, product.co_art)
			setReloadFavorite(true)
		}
	}

	const deleteFavorite = async () => {
		if (!loading) {
			setLoading(true)
			await deleteFavoriteApi(JSON.parse(auth.token).id, product.co_art)
			setReloadFavorite(true)
		}
	}

	if (isFavorite === undefined) return null

	return (
		<IconButton
			icon={isFavorite ? 'cards-heart' : 'heart-outline'}
			color={isFavorite ? '#c40000' : '#057b00'}
			size={30}
			onPress={isFavorite ? deleteFavorite : addFavorite}
		/>
	)
}

const styles = StyleSheet.create({
	btnLabel: {
		fontSize: 18,
	},
	btn: {
		marginTop: 20,
	},
	btnAddFavoritesContent: {
		backgroundColor: '#057b00',
		paddingVertical: 5,
	},
	btnDeleteFavoritesContent: {
		backgroundColor: '#c40000',
		paddingVertical: 5,
	},
})
