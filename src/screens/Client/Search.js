/** @format */

import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import SearchClient from '../../components/Search/indexClient'
import ListClient from '../../components/Client/ListClient'
import ScreenLoading from '../../components/ScreenLoading'
import ResultNotFound from '../../components/Search/ResultNotFound'
import { searchClientsApi } from '../../api/client'
import colors from '../../styles/colors'

export default function SearchScreenClient(props) {
	const { route } = props
	const { params } = route
	const [clients, setClients] = useState(null)

	useEffect(() => {
		;(async () => {
			setClients(null)

			const response = await searchClientsApi(params.search)

			setClients(response)
		})()
	}, [params.search])

	return (
		<>
			<StatusBar backgroundColor={colors.bgBlue} barStyle='light-content' />
			<SearchClient currentSearch={params.search} />
			{!clients ? (
				<ScreenLoading text='Buscando clientes' size='large' />
			) : size(clients) === 0 ? (
				<ResultNotFound search={params.search} />
			) : (
				<ListClient clients={clients} />
			)}
		</>
	)
}
