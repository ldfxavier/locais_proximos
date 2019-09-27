import React, { Component } from 'react';

import { Dimensions } from 'react-native';
import CarouselView from 'react-native-snap-carousel';

import { token_google } from '../../config/config';

import { Text, Title, Container, CardCarousel, ImageLocal } from './styles';

const { width, height } = Dimensions.get('window');

export default class carousel extends Component {
	renderItem({ item }) {
		return (
			<CardCarousel>
				{item.photos != undefined ? (
					<ImageLocal
						source={{
							uri:
								'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
								item.photos[0].photo_reference +
								'&sensor=false&maxheight=200&maxwidth=200&key=' +
								token_google,
						}}
					/>
				) : null}
				<Title>{item.name}</Title>
				{item.photos != undefined ? null : <Text>{item.vicinity}</Text>}
			</CardCarousel>
		);
	}
	render() {
		const { locations, region } = this.props;
		return (
			<Container>
				<CarouselView
					data={locations}
					renderItem={this.renderItem}
					sliderWidth={width}
					itemWidth={Math.round((75 * width) / 100)}
					onBeforeSnapToItem={item => {
						region({
							longitude: locations[item].geometry.location.lng,
							latitude: locations[item].geometry.location.lat,
							latitudeDelta: 0.00522,
							longitudeDelta: (width / height) * 0.00522,
						});
					}}
				/>
			</Container>
		);
	}
}
