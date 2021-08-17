/** @format */

import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { API_URL } from '../../utils/constants'
import { deleteFavoriteApi } from '../../api/favorite'
import colors from '../../styles/colors'

export default function Product(props) {
	const { item, auth, setReloadFavorite } = props
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()

	const goToProduct = (item) => {
		navigation.navigate('product', { infoProduct: item })
	}

	const deleteFavorite = async (id) => {
		setLoading(true)
		await deleteFavoriteApi(auth, id)
		setReloadFavorite(true)
		setLoading(false)
	}

	return (
		<View key={item.co_art} style={styles.product}>
			{/*<View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${item.product.main_image.url}`,
          }}
        />
      </View>*/}
			<View style={styles.info}>
				<View>
					<Text style={styles.name} numberOfLines={3} ellipsizeMode='tail'>
						{item.art_des}
					</Text>
					<View style={styles.prices}>
						<Text style={styles.currentPrice}>
							{parseFloat(item.prec_vta1).toFixed(2)} $
						</Text>
					</View>
				</View>
				<View style={styles.btnsContainer}>
					<Button
						contentStyle={styles.btnBuyContent}
						labelStyle={styles.btnLabel}
						style={styles.btn}
						mode='contained'
						onPress={() => goToProduct(item)}>
						Ver producto
					</Button>
					<IconButton
						icon='delete'
						color={'red'}
						size={18}
						onPress={() => deleteFavorite(item.co_art)}
					/>
				</View>
			</View>

			{loading && (
				<View style={styles.loading}>
					<ActivityIndicator size='large' color='#fff' />
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	product: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#dadde1',
	},
	containerImage: {
		width: '40%',
		height: 200,
		backgroundColor: '#ebebeb',
		padding: 5,
	},
	image: {
		height: '100%',
		resizeMode: 'contain',
	},
	info: {
		padding: 10,
		width: '100%',
		justifyContent: 'space-between',
	},
	name: {
		fontSize: 16,
	},
	btnLabel: {
		fontSize: 12,
	},
	prices: {
		flexDirection: 'row',
		marginTop: 5,
		alignItems: 'flex-end',
	},
	currentPrice: {
		fontSize: 22,
	},
	oldPrice: {
		marginLeft: 7,
		fontSize: 14,
		color: '#747474',
		textDecorationLine: 'line-through',
	},
	btnsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'relative',
		width: '100%',
	},
	btnDelete: {
		backgroundColor: 'red',
		borderRadius: 5,
		margin: 0,
		width: 60,
		height: 32,
	},
	loading: {
		backgroundColor: '#000',
		opacity: 0.4,
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 5,
		justifyContent: 'center',
	},
	btnBuyContent: {
		backgroundColor: '#008fe9',
		paddingVertical: 2,
	},
})
