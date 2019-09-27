import React, { Component } from 'react';

import { StatusBar, Text, Dimensions, Platform, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
	Container,
	ContainerSearch,
	Input,
	IconContainer,
	Title,
	CardFlatlist,
	FlatList,
} from './styles';
import { colors } from '../../styles/colors';

import { token_google } from '../../config/config';
import api from '../../services/api';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: [],
			locations: [],
			search: '',
			keyboard: 10,
		};
	}

	/*
	 ** Método para buscar locais no mapa
	 */
	searchLocation = async text => {
		await api
			.get(
				'/findplacefromtext/json?input=' +
					text +
					'&inputtype=textquery&fields=photos,formatted_address,icon,name,rating,opening_hours,geometry&key=' +
					token_google
			)
			.then(response => {
				let { data } = response;
				if (data.status == 'OK') {
					this.setState({
						region: {
							longitude: data.candidates[0].geometry.location.lng,
							latitude: data.candidates[0].geometry.location.lat,
							latitudeDelta: 0.029213524352655895,
							longitudeDelta:
								(width / height) * 0.029213524352655895,
						},
						locations: [
							{
								id: 'a1',
								icon: data.candidates[0].icon,
								geometry: data.candidates[0].geometry,
								name: data.candidates[0].name,
								vicinity: data.candidates[0].formatted_address,
								photos: data.candidates[0].photos,
							},
						],
					});
				}
			});
	};

	render() {
		const { keyboard, search, locations } = this.state;
		const { toogleSearch, getLocationUser, region } = this.props;
		return (
			<Container>
				<StatusBar
					barStyle={
						Platform.OS === 'ios' ? 'dark-content' : 'light-content'
					}
				/>
				<ContainerSearch style={{ paddingTop: keyboard }}>
					<IconContainer
						onPress={() => {
							Keyboard.dismiss();
							toogleSearch();
						}}
					>
						<Icon
							name="chevron-left"
							size={30}
							color={colors.primary}
						/>
					</IconContainer>
					<Input
						testID="search-input"
						autoCapitalize="none"
						autoCorrect={false}
						value={search}
						onChangeText={text => {
							this.setState({
								search: text,
							});
							this.searchLocation(text);
						}}
						onFocus={() =>
							Platform.OS !== 'ios'
								? this.setState({ keyboard: 300 })
								: {}
						}
						onBlur={() =>
							Platform.OS !== 'ios'
								? this.setState({ keyboard: 10 })
								: {}
						}
						placeholder="O que deseja buscar?"
					/>
					<IconContainer
						testID="clean-input"
						onPress={() => {
							this.setState({
								locations: [],
								search: '',
							});
							Keyboard.dismiss();
							getLocationUser();
						}}
					>
						<Icon name="close" size={20} color={colors.primary} />
					</IconContainer>
				</ContainerSearch>
				{locations != [] ? (
					<FlatList
						data={locations}
						renderItem={({ item }) => (
							<CardFlatlist
								onPress={() => {
									region({
										region: {
											longitude:
												item.geometry.location.lng,
											latitude:
												item.geometry.location.lat,
											latitudeDelta: 0.029213524352655895,
											longitudeDelta:
												(width / height) *
												0.029213524352655895,
										},
										locations: [
											{
												id: 'a1',
												icon: item.icon,
												geometry: item.geometry,
												name: item.name,
												vicinity: item.vicinity,
												photos: item.photos,
											},
										],
									});
									Keyboard.dismiss();
									toogleSearch();
								}}
							>
								<Title>{item.name}</Title>
								<Text>{item.vicinity}</Text>
							</CardFlatlist>
						)}
					/>
				) : null}
			</Container>
		);
	}
}
