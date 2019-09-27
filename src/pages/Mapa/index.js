import React, { Component, Fragment } from 'react';
import {
	Dimensions,
	Alert,
	StatusBar,
	Platform,
	Image,
	Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../../components/search';
import Carousel from '../../components/carousel';

import { colors } from '../../styles/colors';

import { token_google } from '../../config/config';
import api from '../../services/api';

import {
	Maps,
	Callout,
	Title,
	Text,
	Marker,
	IconMarker,
	Button,
	ContainerButton,
	SearchContainer,
} from './styles';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

export default class Mapa extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: [],
			locations: [],
			searchY: new Animated.Value(-height),
			toogle: true,
		};
	}

	componentDidMount() {
		this.getLocationUser();
	}

	/*
	 ** Método para abrir ou fichar a busca
	 */
	toogleSearch = () => {
		const { toogle, searchY } = this.state;
		if (toogle == false) {
			this.setState({ toogle: true });
			Animated.timing(searchY, {
				toValue: -height,
				duration: 500,
			}).start();
		} else {
			this.setState({ toogle: false });
			Animated.timing(searchY, {
				toValue: 0,
				duration: 500,
			}).start();
		}
	};

	/*
	 ** Método para pegar localização do usuário
	 */
	getLocationUser = async () => {
		await Geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				this.setState({
					region: {
						longitude: longitude,
						latitude: latitude,
						latitudeDelta: 0.029213524352655895,
						longitudeDelta: (width / height) * 0.029213524352655895,
					},
				});
				this.getLocationMarker(latitude, longitude);
			},
			error => {
				Alert.alert(
					'Erro ao pegar sua localização!',
					'Por favor, verifique se o GPS está ligado.',
					[{ text: 'OK', onPress: () => {} }],
					{ cancelable: false }
				);
			}
		);
	};

	/*
	 ** Método para consumir dados da API do google
	 */
	async getLocationMarker(latitude, longitude) {
		await api
			.get(
				'/nearbysearch/json?key=' +
					token_google +
					'&radius=5000&type=restaurant&location=' +
					latitude +
					',' +
					longitude
			)
			.then(response =>
				this.setState({
					locations: response.data.results,
				})
			)
			.catch(error =>
				this.setState({
					locations: '',
				})
			);
	}

	/*
	 ** Método para renderizar os makers no mapa
	 */
	renderMakers = () => {
		const { locations } = this.state;
		if (locations != '') {
			return locations.map(r => (
				<Maps.Marker
					id={r.id}
					key={r.id}
					coordinate={{
						longitude: r.geometry.location.lng,
						latitude: r.geometry.location.lat,
						latitudeDelta: 0.00522,
						longitudeDelta: (width / height) * 0.00522,
					}}
					logoEnabled={false}
				>
					<Marker>
						<IconMarker source={{ uri: r.icon }} />
					</Marker>
					<Callout>
						{r.photos != undefined && Platform.OS === 'ios' ? (
							<Image
								style={{ height: 100 }}
								resizeMode="cover"
								source={{
									uri:
										'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
										r.photos[0].photo_reference +
										'&sensor=false&maxheight=200&maxwidth=200&key=' +
										token_google,
								}}
							/>
						) : null}
						<Title>{r.name}</Title>
						<Text>{r.vicinity}</Text>
					</Callout>
				</Maps.Marker>
			));
		}
	};

	render() {
		const { region, searchY, locations } = this.state;
		return (
			<Fragment>
				<StatusBar
					barStyle={
						Platform.OS === 'ios' ? 'dark-content' : 'light-content'
					}
				/>
				{region != '' ? (
					<Maps
						region={region}
						showsUserLocation
						onRegionChangeComplete={e =>
							this.setState({ region: e })
						}
						showsMyLocationButton={false}
					>
						{this.renderMakers()}
					</Maps>
				) : null}
				<ContainerButton>
					<Button onPress={() => this.getLocationUser()}>
						<Icon
							name="gps-fixed"
							size={20}
							color={colors.primary}
						/>
					</Button>
					<Button
						onPress={() => {
							this.toogleSearch();
						}}
					>
						<Icon name="search" size={20} color={colors.primary} />
					</Button>
				</ContainerButton>
				<SearchContainer
					style={{
						bottom: searchY,
					}}
				>
					<Search
						region={state =>
							this.setState({
								region: state.region,
								locations: state.locations,
							})
						}
						toogleSearch={this.toogleSearch}
						getLocationUser={this.getLocationUser}
					/>
				</SearchContainer>
				<Carousel
					locations={locations}
					region={region =>
						this.setState({
							region,
						})
					}
				/>
			</Fragment>
		);
	}
}
